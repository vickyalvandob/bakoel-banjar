<?php

namespace Database\Seeders;

use App\Models\MenuCategory;
use Illuminate\Database\Seeder;

class MenuCategorySeeder extends Seeder
{
    public function run(): void
    {
        /** Ubah nama dan urutan di sini. Pertahankan key agar data yang sama diperbarui. */
        $categories = [
            'gami-spesial' => 'Gami Spesial',
            'iga-sapi' => 'Iga & Sapi',
            'ayam' => 'Ayam',
            'ayam-kampung' => 'Ayam Kampung',
            'bebek' => 'Bebek',
            'seafood' => 'Seafood',
            'ikan' => 'Ikan',
            'sayuran' => 'Sayuran',
            'nasi' => 'Nasi',
            'minuman' => 'Minuman',
        ];

        foreach (array_keys($categories) as $index => $key) {
            $category = MenuCategory::query()->where('seed_key', $key)->first()
                ?? MenuCategory::query()->firstOrNew(['name' => $categories[$key]]);

            $category->forceFill([
                'seed_key' => $key,
                'name' => $categories[$key],
                'sort_order' => $index + 1,
            ])->save();
        }
    }
}
