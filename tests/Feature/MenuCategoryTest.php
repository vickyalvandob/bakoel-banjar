<?php

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('category routes require an administrator and reject writes from other users', function (string $method, string $route, bool $bound) {
    $category = MenuCategory::factory()->create();
    $url = route($route, $bound ? $category : []);
    $data = ['name' => 'Unauthorized', 'sort_order' => 0];

    $this->{$method}($url, $data)->assertRedirect(route('login'));
    $this->actingAs(User::factory()->create())->{$method}($url, $data)->assertForbidden();

    $this->assertDatabaseCount('menu_categories', 1);
    $this->assertDatabaseHas('menu_categories', ['id' => $category->id, 'name' => $category->name]);
})->with([
    ['get', 'admin.categories.index', false],
    ['post', 'admin.categories.store', false],
    ['put', 'admin.categories.update', true],
    ['delete', 'admin.categories.destroy', true],
]);

test('admin creates a category available in both the menu form and public filter', function () {
    $this->actingAs(User::factory()->admin()->create())->post(route('admin.categories.store'), [
        'name' => 'Paket keluarga', 'sort_order' => 3, 'seed_key' => 'injected',
    ])->assertRedirect(route('admin.categories.index'))->assertSessionHas('success');

    $this->assertDatabaseHas('menu_categories', ['name' => 'Paket keluarga', 'sort_order' => 3, 'seed_key' => null]);
    $this->get(route('admin.menu.create'))->assertInertia(fn (Assert $page) => $page->where('categories.0.name', 'Paket keluarga'));
    $this->get(route('menu'))->assertInertia(fn (Assert $page) => $page->where('categories.0.name', 'Paket keluarga'));
});

test('renaming a category updates all public menu labels and accepts the new filter', function () {
    $category = MenuCategory::factory()->create(['name' => 'Lauk']);
    $item = MenuItem::factory()->for($category, 'category')->create();

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.categories.update', $category), [
        'name' => 'Lauk favorit', 'sort_order' => 2,
    ])->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'category_id' => $category->id]);
    $this->get(route('menu', ['category' => 'Lauk favorit']))->assertInertia(fn (Assert $page) => $page
        ->has('items.data', 1)->where('items.data.0.category', 'Lauk favorit'));
});

test('categories follow display order and include menu counts for administrators', function () {
    $last = MenuCategory::factory()->create(['sort_order' => 9]);
    $first = MenuCategory::factory()->create(['sort_order' => 1]);
    MenuItem::factory()->for($first, 'category')->count(2)->create();

    $this->actingAs(User::factory()->admin()->create())->get(route('admin.categories.index'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/categories')
            ->where('categories.0.id', $first->id)->where('categories.0.items_count', 2)->where('categories.1.id', $last->id));
});

test('invalid category data does not create records', function (array $data, string $field, string $message) {
    MenuCategory::factory()->create(['name' => 'Ayam']);

    $this->actingAs(User::factory()->admin()->create())->post(route('admin.categories.store'), $data)
        ->assertSessionHasErrors([$field => $message]);

    $this->assertDatabaseCount('menu_categories', 1);
})->with([
    [['name' => '', 'sort_order' => 0], 'name', 'Nama kategori wajib diisi.'],
    [['name' => 'Ayam', 'sort_order' => 0], 'name', 'Nama kategori sudah digunakan.'],
    [['name' => str_repeat('a', 41), 'sort_order' => 0], 'name', 'Nama kategori maksimal 40 karakter.'],
    [['name' => 'Baru', 'sort_order' => -1], 'sort_order', 'Urutan harus antara 0 dan 65535.'],
]);

test('a category name cannot be changed to another existing name', function () {
    $category = MenuCategory::factory()->create(['name' => 'Ayam']);
    MenuCategory::factory()->create(['name' => 'Bebek']);

    $this->actingAs(User::factory()->admin()->create())->put(route('admin.categories.update', $category), [
        'name' => 'Bebek', 'sort_order' => 0,
    ])->assertSessionHasErrors(['name' => 'Nama kategori sudah digunakan.']);

    $this->assertDatabaseHas('menu_categories', ['id' => $category->id, 'name' => 'Ayam']);
});

test('a category containing draft menus cannot be deleted', function () {
    $category = MenuCategory::factory()->create();
    $item = MenuItem::factory()->for($category, 'category')->draft()->create();

    $this->actingAs(User::factory()->admin()->create())->delete(route('admin.categories.destroy', $category))
        ->assertSessionHasErrors(['category' => 'Pindahkan atau hapus menu di kategori ini terlebih dahulu.']);

    $this->assertModelExists($category);
    $this->assertModelExists($item);
});

test('admin can delete an empty category', function () {
    $category = MenuCategory::factory()->create();

    $this->actingAs(User::factory()->admin()->create())->delete(route('admin.categories.destroy', $category))
        ->assertRedirect(route('admin.categories.index'));

    $this->assertModelMissing($category);
});

test('unknown category filters return validation errors instead of ignoring the filter', function () {
    MenuItem::factory()->create();

    $this->get(route('menu', ['category' => 'Unknown']))->assertSessionHasErrors('category');
});
