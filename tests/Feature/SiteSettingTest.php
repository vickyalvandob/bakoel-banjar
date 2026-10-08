<?php

use App\Models\SiteSetting;
use App\Models\User;
use Database\Seeders\SiteSettingSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('website settings require an administrator', function (string $method, string $route) {
    $this->{$method}(route($route))->assertRedirect(route('login'));
    $this->actingAs(User::factory()->create())->{$method}(route($route))->assertForbidden();

    $this->assertDatabaseCount('site_settings', 0);
})->with([['get', 'admin.settings.edit'], ['put', 'admin.settings.update']]);

test('settings and public defaults render without creating a record', function () {
    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->where('site.logo_url', null)
        ->where('site.favicon_url', asset('favicon.svg'))
        ->where('site.home_image_url', asset('images/Bakoel%20Banjar%20Spicy%20Seafood%20Feast.webp'))
        ->where('site.about_image_url', asset('images/Bakoel%20Banjar%20Family%20Feast.png'))
        ->where('seo.title', 'Beranda - Bakoel Banjar'));
    $this->actingAs(User::factory()->admin()->create())->get(route('admin.settings.edit'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/settings')->has('customImages', 0));

    $this->assertDatabaseCount('site_settings', 0);
});

test('admin uploads all website images and publishes metadata across public pages', function () {
    Storage::fake('public');
    $uploads = [];
    foreach (['logo', 'favicon', 'meta_image', 'home_image', 'about_image'] as $field) {
        $uploads[$field] = UploadedFile::fake()->image($field.'.png');
    }

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.settings.update'), [
        '_method' => 'put', 'meta_title' => 'Rasa Bakoel', 'meta_description' => 'Sajian hangat setiap hari.',
        'key' => 'injected', 'logo_path' => 'injected.php', ...$uploads,
    ])->assertRedirect(route('admin.settings.edit'))->assertSessionHas('success');

    $this->assertDatabaseCount('site_settings', 1);
    $this->assertDatabaseHas('site_settings', ['key' => 'main', 'meta_title' => 'Rasa Bakoel', 'meta_description' => 'Sajian hangat setiap hari.']);
    $settings = SiteSetting::current();
    foreach ($uploads as $field => $upload) {
        Storage::disk('public')->assertExists($settings->getAttribute($field.'_path'));
        expect($settings->getAttribute($field.'_path'))->not->toBe('injected.php');
    }
    foreach (['home' => 'Rasa Bakoel', 'about' => 'Tentang - Rasa Bakoel', 'menu' => 'Menu - Rasa Bakoel', 'services' => 'Layanan - Rasa Bakoel', 'contact' => 'Kontak - Rasa Bakoel'] as $route => $title) {
        $this->get(route($route))->assertInertia(fn (Assert $page) => $page
            ->where('seo.title', $title)->where('seo.description', 'Sajian hangat setiap hari.')
            ->where('seo.image', url(Storage::disk('public')->url($settings->meta_image_path)))
            ->where('site.logo_url', url(Storage::disk('public')->url($settings->logo_path)))
            ->where('site.home_image_url', url(Storage::disk('public')->url($settings->home_image_path)))
            ->where('site.about_image_url', url(Storage::disk('public')->url($settings->about_image_path))));
    }
});

test('text updates preserve uploads and replacement removes only the previous file', function () {
    Storage::fake('public');
    $old = UploadedFile::fake()->image('old.png')->store('site', 'public');
    $about = UploadedFile::fake()->image('about.png')->store('site', 'public');
    SiteSetting::factory()->create(['logo_path' => $old, 'about_image_path' => $about]);
    $this->actingAs(User::factory()->admin()->create())->put(route('admin.settings.update'), ['meta_title' => 'Judul baru'])
        ->assertRedirect(route('admin.settings.edit'));
    $this->assertDatabaseHas('site_settings', ['logo_path' => $old, 'about_image_path' => $about, 'meta_title' => 'Judul baru']);

    $this->post(route('admin.settings.update'), [
        '_method' => 'put', 'logo' => UploadedFile::fake()->image('new.webp'), 'remove_logo' => true,
    ])->assertRedirect(route('admin.settings.edit'));

    Storage::disk('public')->assertMissing($old);
    Storage::disk('public')->assertExists([SiteSetting::current()->logo_path, $about]);
    Storage::disk('public')->assertCount('site', 2);
    $this->assertDatabaseCount('site_settings', 1);
});

test('removing custom images restores defaults and clearing metadata restores default text', function () {
    Storage::fake('public');
    $paths = [];
    $removals = [];
    foreach (['logo', 'favicon', 'meta_image', 'home_image', 'about_image'] as $field) {
        $paths[$field.'_path'] = UploadedFile::fake()->image($field.'.png')->store('site', 'public');
        $removals['remove_'.$field] = true;
    }
    SiteSetting::factory()->create($paths);

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.settings.update'), [
        ...$removals, 'meta_title' => '', 'meta_description' => '',
    ])->assertRedirect(route('admin.settings.edit'));

    Storage::disk('public')->assertCount('site', 0);
    $this->assertDatabaseHas('site_settings', ['key' => 'main', 'meta_title' => null, 'meta_description' => null, ...array_fill_keys(array_keys($paths), null)]);
    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->where('site.logo_url', null)->where('site.favicon_url', asset('favicon.svg'))
        ->where('site.home_image_url', asset('images/Bakoel%20Banjar%20Spicy%20Seafood%20Feast.webp'))
        ->where('site.about_image_url', asset('images/Bakoel%20Banjar%20Family%20Feast.png'))
        ->where('seo.image', asset('images/Bakoel%20Banjar%20Spicy%20Seafood%20Feast.webp'))
        ->where('seo.title', 'Beranda - Bakoel Banjar'));
});

test('meta image falls back to the uploaded home image', function () {
    SiteSetting::factory()->create(['home_image_path' => 'site/home.jpg']);

    $this->get(route('about'))->assertInertia(fn (Assert $page) => $page
        ->where('seo.image', Storage::disk('public')->url('site/home.jpg')));
});

test('invalid uploads leave stored metadata and files unchanged', function (string $field, string $kind, string $message) {
    Storage::fake('public');
    $old = UploadedFile::fake()->image('old.png')->store('site', 'public');
    SiteSetting::factory()->create(['meta_title' => 'Tetap', $field.'_path' => $old]);
    $upload = match ($kind) {
        'svg' => UploadedFile::fake()->createWithContent('bad.svg', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'),
        'large' => UploadedFile::fake()->image('large.png')->size($field === 'favicon' ? 1025 : 4097),
        'text' => UploadedFile::fake()->createWithContent('fake.png', '<?php echo "unsafe";')->mimeType('text/x-php'),
        'jpeg' => UploadedFile::fake()->image('icon.jpg'),
    };

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.settings.update'), [
        '_method' => 'put', 'meta_title' => 'Jangan simpan', $field => $upload, 'remove_'.$field => true,
    ])->assertSessionHasErrors([$field => $message]);

    $this->assertDatabaseHas('site_settings', ['key' => 'main', 'meta_title' => 'Tetap', $field.'_path' => $old]);
    Storage::disk('public')->assertExists($old);
    Storage::disk('public')->assertCount('site', 1);
})->with([
    'active logo' => ['logo', 'svg', 'Pilih gambar JPG, PNG, atau WebP yang valid.'],
    'disguised image' => ['home_image', 'text', 'Pilih gambar JPG, PNG, atau WebP yang valid.'],
    'large about' => ['about_image', 'large', 'Ukuran gambar maksimal 4 MB.'],
    'large social image' => ['meta_image', 'large', 'Ukuran gambar maksimal 4 MB.'],
    'active favicon' => ['favicon', 'svg', 'Favicon harus berupa file PNG atau ICO yang valid.'],
    'unsupported favicon' => ['favicon', 'jpeg', 'Favicon harus berupa file PNG atau ICO yang valid.'],
    'large favicon' => ['favicon', 'large', 'Ukuran favicon maksimal 1 MB.'],
]);

test('invalid text and removal flags cannot change website settings', function (string $field, mixed $value, string $message) {
    SiteSetting::factory()->create(['meta_title' => 'Tetap']);

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.settings.update'), [$field => $value])
        ->assertSessionHasErrors([$field => $message]);

    $this->assertDatabaseHas('site_settings', ['key' => 'main', 'meta_title' => 'Tetap']);
})->with([
    'long title' => ['meta_title', str_repeat('a', 121), 'Meta title maksimal 120 karakter.'],
    'long description' => ['meta_description', str_repeat('a', 321), 'Meta description maksimal 320 karakter.'],
    'title array' => ['meta_title', ['invalid'], 'Meta title harus berupa teks.'],
    'description array' => ['meta_description', ['invalid'], 'Meta description harus berupa teks.'],
    'invalid removal' => ['remove_logo', 'yes', 'Pilihan hapus gambar tidak valid.'],
]);

test('favicon accepts an ico file', function () {
    Storage::fake('public');
    $pngUpload = UploadedFile::fake()->image('icon.png', 32, 32);
    $png = file_get_contents($pngUpload->getPathname());
    $icon = pack('vvv', 0, 1, 1).pack('CCCCvvVV', 32, 32, 0, 0, 1, 32, strlen($png), 22).$png;

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.settings.update'), [
        '_method' => 'put', 'favicon' => UploadedFile::fake()->createWithContent('favicon.ico', $icon),
    ])->assertSessionHasNoErrors()->assertRedirect(route('admin.settings.edit'));

    Storage::disk('public')->assertExists(SiteSetting::current()->favicon_path);
});

test('initial html exposes escaped metadata and favicon without relying on javascript', function () {
    config(['inertia.ssr.enabled' => false]);
    SiteSetting::factory()->create([
        'meta_title' => 'Bakoel <script>alert(1)</script>',
        'meta_description' => 'Makan "enak" <bersama>',
        'meta_image_path' => 'site/share.png', 'favicon_path' => 'site/icon.png',
    ]);

    $this->get(route('home'))
        ->assertSee('<title data-inertia>Bakoel &lt;script&gt;alert(1)&lt;/script&gt;</title>', false)
        ->assertSee('name="description" content="Makan &quot;enak&quot; &lt;bersama&gt;"', false)
        ->assertSee('property="og:image" content="'.Storage::disk('public')->url('site/share.png').'"', false)
        ->assertSee('name="twitter:image" content="'.Storage::disk('public')->url('site/share.png').'"', false)
        ->assertSee('rel="icon" href="'.Storage::disk('public')->url('site/icon.png').'"', false)
        ->assertDontSee('<script>alert(1)</script>', false);
});

test('failed database saves discard new uploads and preserve previous files', function () {
    Storage::fake('public');
    Exceptions::fake();
    $old = UploadedFile::fake()->image('old.png')->store('site', 'public');
    SiteSetting::factory()->create(['logo_path' => $old, 'meta_title' => 'Tetap']);
    Event::listen('eloquent.saving: '.SiteSetting::class, function (): never {
        throw new RuntimeException('Simulated save failure');
    });

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.settings.update'), [
        '_method' => 'put', 'meta_title' => 'Jangan simpan',
        'logo' => UploadedFile::fake()->image('new.png'), 'home_image' => UploadedFile::fake()->image('home.png'),
    ])->assertServerError();

    $this->assertDatabaseHas('site_settings', ['key' => 'main', 'logo_path' => $old, 'meta_title' => 'Tetap']);
    Storage::disk('public')->assertExists($old);
    Storage::disk('public')->assertCount('site', 1);
    Exceptions::assertReported(RuntimeException::class);
});

test('seeding website settings preserves admin changes', function () {
    SiteSetting::factory()->create(['meta_title' => 'Judul pilihan admin', 'logo_path' => 'site/logo.png']);

    $this->seed(SiteSettingSeeder::class);

    $this->assertDatabaseCount('site_settings', 1);
    $this->assertDatabaseHas('site_settings', ['key' => 'main', 'meta_title' => 'Judul pilihan admin', 'logo_path' => 'site/logo.png']);
});
