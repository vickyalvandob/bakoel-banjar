<?php

use App\Models\ContactSetting;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\MenuItemSeeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

test('fresh seed provides a working admin login and a complete menu catalog', function () {
    Artisan::call('db:seed', ['--class' => DatabaseSeeder::class, '--force' => true]);
    preg_match('/Password awal: ([^\r\n]+)/', Artisan::output(), $credentials);

    $this->assertDatabaseCount('users', 1);
    $this->assertDatabaseCount('menu_categories', 10);
    $this->assertDatabaseCount('menu_items', 22);
    $this->assertDatabaseCount('contact_settings', 1);
    $this->assertDatabaseHas('users', ['email' => 'admin@bakoel.test', 'is_admin' => true]);
    $this->post(route('login.store'), ['email' => 'admin@bakoel.test', 'password' => $credentials[1]])
        ->assertRedirect(route('dashboard', absolute: false));
    $this->assertAuthenticated();
    $this->get(route('dashboard'))->assertRedirect(route('admin.dashboard'));
    $this->get(route('admin.dashboard'))->assertInertia(fn (Assert $page) => $page->where('stats.total', 22));
    $this->get(route('menu', ['category' => 'Minuman']))->assertInertia(fn (Assert $page) => $page->has('items.data', 2));
    $item = MenuItem::query()->where('seed_key', 'ayam-sambal-gami')->firstOrFail();
    expect($item->publicData()['image_url'])->toBe(asset('images/template/photo-1547592180-85f173990554.jpg'));
});

test('reseeding applies the seed content without duplicating records or resetting the admin password', function () {
    $this->seed(DatabaseSeeder::class);
    $admin = User::query()->firstOrFail();
    $admin->update(['password' => 'Changed-password-2026!']);
    $item = MenuItem::query()->where('seed_key', 'ayam-sambal-gami')->firstOrFail();
    $item->update(['name' => 'Gami andalan', 'price' => 41000, 'is_published' => false]);
    $category = MenuCategory::query()->where('seed_key', 'gami-spesial')->firstOrFail();
    $category->update(['name' => 'Gami pilihan', 'sort_order' => 99]);
    ContactSetting::current()->update(['address' => 'Alamat baru', 'email' => 'changed@example.com', 'whatsapp' => null]);

    $this->seed(DatabaseSeeder::class);

    $this->assertDatabaseCount('users', 1);
    $this->assertDatabaseCount('menu_categories', 10);
    $this->assertDatabaseCount('menu_items', 22);
    $this->assertDatabaseCount('contact_settings', 1);
    $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'name' => 'Ayam Sambal Gami', 'price' => 22000, 'is_published' => true]);
    $this->assertDatabaseHas('menu_categories', ['id' => $category->id, 'name' => 'Gami Spesial', 'sort_order' => 1]);
    $this->assertDatabaseHas('contact_settings', ['key' => 'main', 'whatsapp' => '6285284588839', 'email' => null]);
    expect(Hash::check('Changed-password-2026!', $admin->fresh()->password))->toBeTrue();
});

test('admin seeder refuses to promote an existing regular account', function () {
    $user = User::factory()->create(['email' => 'admin@bakoel.test']);

    expect(fn () => $this->seed(AdminUserSeeder::class))->toThrow(RuntimeException::class, 'Email admin sudah digunakan akun non-admin.');

    $this->assertDatabaseHas('users', ['id' => $user->id, 'password' => $user->password, 'is_admin' => false]);
});

test('admin seeder generates an initial password without overwriting it on rerun', function () {
    $this->artisan('db:seed', ['--class' => AdminUserSeeder::class, '--force' => true])
        ->expectsOutputToContain('Password awal:')->assertSuccessful();
    $admin = User::query()->where('email', 'admin@bakoel.test')->firstOrFail();
    $originalPassword = $admin->password;

    $this->seed(AdminUserSeeder::class);

    $this->assertDatabaseHas('users', ['id' => $admin->id, 'is_admin' => true, 'password' => $originalPassword]);
    expect(Hash::check('password', $originalPassword))->toBeFalse();
});

test('admin seed runs consistently in every environment without extra configuration', function (string $environment) {
    $originalEnvironment = app()->environment();
    app()->detectEnvironment(fn () => $environment);

    try {
        $this->artisan('db:seed', ['--class' => AdminUserSeeder::class, '--force' => true])->assertSuccessful();
    } finally {
        app()->detectEnvironment(fn () => $originalEnvironment);
    }

    $this->assertDatabaseHas('users', ['email' => 'admin@bakoel.test', 'is_admin' => true]);
})->with(['local', 'testing', 'production']);

test('seeders adopt existing matching content and preserve menus outside the seed catalog', function () {
    $category = MenuCategory::factory()->create(['name' => 'Gami Spesial']);
    $existing = MenuItem::factory()->for($category, 'category')->create(['name' => 'Ayam Sambal Gami']);
    $custom = MenuItem::factory()->create(['name' => 'Menu khusus CMS', 'price' => 64000]);

    $this->seed(MenuItemSeeder::class);

    $this->assertDatabaseCount('menu_items', 23);
    $this->assertDatabaseHas('menu_items', ['id' => $existing->id, 'seed_key' => 'ayam-sambal-gami']);
    $this->assertDatabaseHas('menu_categories', ['id' => $category->id, 'seed_key' => 'gami-spesial']);
    $this->assertDatabaseHas('menu_items', ['id' => $custom->id, 'name' => 'Menu khusus CMS', 'price' => 64000]);
});
