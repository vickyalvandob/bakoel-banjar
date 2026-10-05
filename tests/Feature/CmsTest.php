<?php

use App\Models\ContactSetting;
use App\Models\MenuItem;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('only administrators are granted content management permission', function () {
    expect(Gate::forUser(User::factory()->make())->allows('manage-content'))->toBeFalse();
    expect(Gate::forUser(User::factory()->admin()->make())->allows('manage-content'))->toBeTrue();
});

test('cms routes require login and admin permission', function (string $method, string $route) {
    $item = MenuItem::factory()->create();
    $url = route($route, str_contains($route, 'menu.') && in_array($method, ['put', 'delete']) ? $item : []);
    $this->{$method}($url)->assertRedirect(route('login'));

    $this->actingAs(User::factory()->create())->{$method}($url)->assertForbidden();
    $this->assertModelExists($item);
    $this->assertDatabaseCount('menu_items', 1);
    $this->assertDatabaseCount('contact_settings', 0);
})->with([
    ['get', 'admin.dashboard'], ['get', 'admin.menu.index'], ['get', 'admin.menu.create'],
    ['post', 'admin.menu.store'], ['put', 'admin.menu.update'], ['delete', 'admin.menu.destroy'],
    ['get', 'admin.contact.edit'], ['put', 'admin.contact.update'],
]);

test('administrators can render cms pages', function () {
    $admin = User::factory()->admin()->create();
    $item = MenuItem::factory()->draft()->create();

    $this->actingAs($admin)->get(route('admin.dashboard'))->assertInertia(fn (Assert $page) => $page->component('admin/dashboard')->where('stats.total', 1)->where('stats.published', 0));
    $this->get(route('admin.menu.index'))->assertInertia(fn (Assert $page) => $page->component('admin/menu/index')->where('items.data.0.is_published', false));
    $this->get(route('admin.menu.edit', $item))->assertInertia(fn (Assert $page) => $page->component('admin/menu/form')->where('item.id', $item->id));
    $this->get(route('admin.contact.edit'))->assertInertia(fn (Assert $page) => $page->component('admin/contact'));
});

test('admin creates menu with photo and ignores unvalidated attributes', function () {
    Storage::fake('public');
    $data = MenuItem::factory()->make(['name' => 'Ayam Baru'])->toArray();

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.menu.store'), [...$data, 'image' => UploadedFile::fake()->image('ayam.jpg'), 'image_path' => 'not-authorized.jpg'])
        ->assertRedirect(route('admin.menu.index'))->assertSessionHas('success');

    $item = MenuItem::query()->where('name', 'Ayam Baru')->firstOrFail();
    $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'price' => 25000, 'is_published' => true]);
    expect($item->image_path)->not->toBe('not-authorized.jpg');
    Storage::disk('public')->assertExists($item->image_path);
});

test('menu updates replace photos and publication is reflected publicly', function () {
    Storage::fake('public');
    $old = UploadedFile::fake()->image('old.jpg')->store('menu', 'public');
    $item = MenuItem::factory()->create(['image_path' => $old]);

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.menu.update', $item), [
        ...$item->toArray(), '_method' => 'PUT', 'name' => 'Updated menu', 'is_published' => false,
        'image' => UploadedFile::fake()->image('new.png'),
    ])->assertRedirect(route('admin.menu.index'));

    $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'name' => 'Updated menu', 'is_published' => false]);
    Storage::disk('public')->assertMissing($old);
    Storage::disk('public')->assertExists($item->fresh()->image_path);
    $this->get(route('menu'))->assertInertia(fn (Assert $page) => $page->has('items.data', 0));
});

test('removing a menu photo preserves the menu', function () {
    Storage::fake('public');
    $old = UploadedFile::fake()->image('old.jpg')->store('menu', 'public');
    $item = MenuItem::factory()->create(['image_path' => $old]);

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.menu.update', $item), [
        ...$item->toArray(), 'remove_image' => true,
    ])->assertRedirect(route('admin.menu.index'));

    $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'image_path' => null]);
    Storage::disk('public')->assertMissing($old);
});

test('deleting a menu removes its stored image', function () {
    Storage::fake('public');
    $path = UploadedFile::fake()->image('menu.jpg')->store('menu', 'public');
    $item = MenuItem::factory()->create(['image_path' => $path]);

    $this->actingAs(User::factory()->admin()->create())->delete(route('admin.menu.destroy', $item))
        ->assertRedirect(route('admin.menu.index'));

    $this->assertModelMissing($item);
    Storage::disk('public')->assertMissing($path);
});

test('invalid prices and categories never create a menu', function (array $override, string $field, string $message) {
    $data = MenuItem::factory()->make()->toArray();

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.menu.store'), [...$data, ...$override])
        ->assertSessionHasErrors([$field => $message]);

    $this->assertDatabaseCount('menu_items', 0);
})->with([
    [['name' => ''], 'name', 'Nama menu wajib diisi.'],
    [['price' => -1], 'price', 'Harga tidak boleh negatif.'],
    [['price' => '12.5'], 'price', 'Harga harus berupa Rupiah tanpa desimal.'],
    [['price' => 100000001], 'price', 'Harga maksimal Rp100.000.000.'],
    [['category' => 'Invalid'], 'category', 'Pilih kategori menu yang tersedia.'],
]);

test('unsafe or oversized uploads do not modify existing menu or photo', function (string $kind) {
    Storage::fake('public');
    $old = UploadedFile::fake()->image('old.jpg')->store('menu', 'public');
    $item = MenuItem::factory()->create(['image_path' => $old]);
    $upload = match ($kind) {
        'svg' => UploadedFile::fake()->createWithContent('bad.svg', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'),
        'large' => UploadedFile::fake()->image('big.jpg')->size(4097),
        'text' => UploadedFile::fake()->createWithContent('file.jpg', '<?php echo "bad";'),
    };

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.menu.update', $item), [
        ...$item->toArray(), '_method' => 'PUT', 'name' => 'Must not save', 'image' => $upload,
    ])->assertSessionHasErrors('image');

    $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'name' => $item->name, 'image_path' => $old]);
    Storage::disk('public')->assertExists($old);
    Storage::disk('public')->assertCount('menu', 1);
})->with(['svg', 'large', 'text']);

test('contact updates normalize whatsapp and appear across public pages', function () {
    $data = ContactSetting::factory()->make()->toArray();
    $data['whatsapp'] = '0852-8458-8839';
    $data['address'] = 'Alamat baru';

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.contact.update'), [...$data, 'key' => 'injected'])
        ->assertRedirect(route('admin.contact.edit'))->assertSessionHas('success');

    $this->assertDatabaseCount('contact_settings', 1);
    $this->assertDatabaseHas('contact_settings', ['key' => 'main', 'whatsapp' => '6285284588839', 'address' => 'Alamat baru']);
    $this->get(route('contact'))->assertInertia(fn (Assert $page) => $page->where('contact.whatsapp', '6285284588839')->where('contact.address', 'Alamat baru'));
});

test('contact updates reject unsafe urls and invalid phone without changing stored data', function () {
    $setting = ContactSetting::factory()->create();

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.contact.update'), [
        'maps_url' => 'javascript:alert(1)', 'instagram_url' => 'http://insecure.example', 'whatsapp' => 'abc',
    ])->assertSessionHasErrors([
        'maps_url' => 'Tautan lokasi harus menggunakan https://.',
        'instagram_url' => 'Tautan Instagram harus menggunakan https://.',
        'whatsapp' => 'Masukkan nomor WhatsApp yang valid, misalnya 081234567890.',
    ]);

    $this->assertDatabaseHas('contact_settings', ['id' => $setting->id, 'whatsapp' => $setting->whatsapp]);
});

test('contact details can be cleared without retaining old links', function () {
    ContactSetting::factory()->create();

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.contact.update'), [
        'address' => '', 'whatsapp' => '', 'email' => '', 'opening_hours' => '', 'maps_url' => '', 'instagram_url' => '',
    ])->assertRedirect(route('admin.contact.edit'));

    $this->get(route('contact'))->assertInertia(fn (Assert $page) => $page->where('contact.whatsapp', null)->where('contact.address', null));
});

test('public registration is unavailable', function () {
    $this->get('/register')->assertNotFound();
    $this->post('/register', ['email' => 'intruder@example.com', 'is_admin' => true])->assertNotFound();
    $this->assertDatabaseCount('users', 0);
});
