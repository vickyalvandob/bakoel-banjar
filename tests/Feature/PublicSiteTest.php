<?php

use App\Models\ContactSetting;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Database\Seeders\ContactSettingSeeder;
use Database\Seeders\MenuItemSeeder;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('public pages render contact information without authentication', function (string $route, string $component) {
    $contact = ContactSetting::factory()->create();

    $this->get(route($route))->assertInertia(fn (Assert $page) => $page
        ->component($component)
        ->where('contact.whatsapp', $contact->whatsapp)
        ->where('contact.address', $contact->address));
})->with([
    ['home', 'public/home'], ['menu', 'public/menu'], ['services', 'public/services'],
    ['contact', 'public/contact'], ['about', 'public/about'],
]);

test('home only shows four published featured menus in display order', function () {
    MenuItem::factory()->draft()->featured()->create(['name' => 'Secret draft', 'sort_order' => 0]);
    MenuItem::factory()->create(['name' => 'Ordinary item']);
    $first = MenuItem::factory()->featured()->create(['sort_order' => 1]);
    MenuItem::factory()->featured()->count(4)->create(['sort_order' => 2]);

    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->has('featured', 4)
        ->where('featured.0.id', $first->id));
});

test('menu filters published items by search and category', function () {
    $category = MenuCategory::factory()->create(['name' => 'Ayam']);
    $match = MenuItem::factory()->for($category, 'category')->create(['name' => 'Ayam Gami']);
    MenuItem::factory()->for($category, 'category')->draft()->create(['name' => 'Ayam rahasia']);
    MenuItem::factory()->create(['name' => 'Bebek']);
    MenuItem::factory()->create(['name' => 'Ayam special']);

    $this->get(route('menu', ['search' => 'Ayam', 'category' => 'Ayam']))
        ->assertInertia(fn (Assert $page) => $page
            ->has('items.data', 1)
            ->where('items.data.0.id', $match->id)
            ->where('filters.search', 'Ayam'));
});

test('public pagination is stable and sold out items remain visible', function () {
    MenuItem::factory()->count(12)->create(['sort_order' => 0]);
    $last = MenuItem::factory()->create(['sort_order' => 0, 'is_available' => false]);

    $this->get(route('menu', ['page' => 2]))->assertInertia(fn (Assert $page) => $page
        ->where('items.total', 13)->has('items.data', 1)
        ->where('items.data.0.id', $last->id)->where('items.data.0.is_available', false));
});

test('empty site renders without creating contact records on read', function () {
    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page
        ->has('featured', 0)->where('contact.whatsapp', null));

    $this->assertDatabaseCount('contact_settings', 0);
});

test('content seeders reapply editable data on rerun without duplicates', function () {
    Storage::fake('public');
    $this->seed([ContactSettingSeeder::class, MenuItemSeeder::class]);
    $item = MenuItem::query()->where('name', 'Ayam Sambal Gami')->firstOrFail();
    $item->update(['price' => 30000, 'is_published' => false]);
    ContactSetting::current()->update(['whatsapp' => '628111111111']);

    $this->seed([ContactSettingSeeder::class, MenuItemSeeder::class]);

    $this->assertDatabaseCount('menu_items', 22);
    $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'price' => 22000, 'is_published' => true]);
    $this->assertDatabaseHas('contact_settings', ['key' => 'main', 'whatsapp' => '6285284588839']);
});
