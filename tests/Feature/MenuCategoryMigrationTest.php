<?php

use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Support\Facades\DB;

test('category migration preserves existing menus and restores category names on rollback', function () {
    $category = MenuCategory::factory()->create(['name' => 'Kategori lama']);
    $items = MenuItem::factory()->for($category, 'category')->count(2)->create(['price' => 37000, 'is_published' => false]);
    $linkMigration = require database_path('migrations/2026_10_08_021451_link_menu_items_to_categories.php');
    $categoryMigration = require database_path('migrations/2026_10_08_021450_create_menu_categories_table.php');

    $linkMigration->down();
    $categoryMigration->down();

    foreach ($items as $item) {
        $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'category' => 'Kategori lama', 'price' => 37000, 'is_published' => false]);
    }

    $categoryMigration->up();
    $linkMigration->up();

    $this->assertDatabaseCount('menu_categories', 1);
    $this->assertDatabaseCount('menu_items', 2);
    $newCategoryId = DB::table('menu_categories')->where('name', 'Kategori lama')->value('id');
    foreach ($items as $item) {
        $this->assertDatabaseHas('menu_items', ['id' => $item->id, 'category_id' => $newCategoryId, 'price' => 37000, 'is_published' => false]);
    }
});
