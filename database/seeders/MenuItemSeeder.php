<?php

namespace Database\Seeders;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(MenuCategorySeeder::class);
        $categories = MenuCategory::query()->pluck('id', 'seed_key');

        /** Ubah data menu di sini. Key tetap sama saat mengganti nama atau harga. */
        $items = [
            'ayam-sambal-gami' => [
                'name' => 'Ayam Sambal Gami',
                'category' => 'gami-spesial',
                'price' => 22000,
                'description' => 'Ayam gurih dengan sambal gami panas khas Banjar.',
                'image' => 'images/template/photo-1547592180-85f173990554.jpg',
                'is_featured' => true,
            ],
            'bebek-gami' => [
                'name' => 'Bebek Gami',
                'category' => 'gami-spesial',
                'price' => 35000,
                'description' => 'Bebek empuk dengan sambal gami yang pedas dan wangi.',
                'image' => 'images/template/photo-1544025162-d76694265947.jpg',
            ],
            'udang-sambal-gami' => [
                'name' => 'Udang Sambal Gami',
                'category' => 'gami-spesial',
                'price' => 35000,
                'description' => 'Udang segar dengan sambal gami pedas aromatik.',
                'image' => 'images/template/photo-1565680018434-b513d5e5fd47.jpg',
                'is_featured' => true,
            ],
            'nila-gami' => [
                'name' => 'Nila Gami',
                'category' => 'gami-spesial',
                'price' => 25000,
                'description' => 'Ikan nila dengan sambal gami gurih dan pedas.',
                'image' => 'images/template/photo-1515003197210-e0cd71810b5f.jpg',
            ],
            'iga-bakar-saus-bbq' => [
                'name' => 'Iga Bakar Saus BBQ',
                'category' => 'iga-sapi',
                'price' => 50000,
                'description' => 'Iga sapi bakar dengan saus BBQ yang manis gurih.',
                'image' => 'images/template/photo-1544025162-d76694265947.jpg',
            ],
            'sapi-lada-hitam' => [
                'name' => 'Sapi Lada Hitam',
                'category' => 'iga-sapi',
                'price' => 50000,
                'description' => 'Daging sapi dengan lada hitam dan saus gurih.',
                'image' => 'images/template/photo-1558030006-450675393462.jpg',
            ],
            'ayam-bakar-madu' => [
                'name' => 'Ayam Bakar Madu',
                'category' => 'ayam',
                'price' => 18000,
                'description' => 'Ayam bakar dengan sentuhan madu yang manis gurih.',
                'image' => 'images/template/photo-1532550907401-a500c9a57435.jpg',
            ],
            'ayam-rica-rica' => [
                'name' => 'Ayam Rica-Rica',
                'category' => 'ayam',
                'price' => 25000,
                'description' => 'Pedas aromatik dengan bumbu yang meresap.',
                'image' => 'images/template/photo-1604908176997-125f25cc6f3d.jpg',
            ],
            'ayam-kampung-goreng' => [
                'name' => 'Ayam Kampung Goreng',
                'category' => 'ayam-kampung',
                'price' => 25000,
                'description' => 'Ayam kampung goreng dengan tekstur gurih.',
                'image' => 'images/template/photo-1562967914-608f82629710.jpg',
            ],
            'ayam-kampung-kecap' => [
                'name' => 'Ayam Kampung Kecap',
                'category' => 'ayam-kampung',
                'price' => 35000,
                'description' => 'Manis gurih, cocok untuk makan bersama.',
                'image' => 'images/template/photo-1601050690597-df0568f70950.jpg',
            ],
            'bebek-goreng' => [
                'name' => 'Bebek Goreng',
                'category' => 'bebek',
                'price' => 30000,
                'description' => 'Bebek goreng gurih dengan tekstur renyah.',
                'image' => 'images/template/photo-1598514983318-2f64f8f4796c.jpg',
                'is_featured' => true,
            ],
            'bebek-rica-rica' => [
                'name' => 'Bebek Rica-Rica',
                'category' => 'bebek',
                'price' => 35000,
                'description' => 'Bebek dengan rica-rica pedas yang kaya rempah.',
                'image' => 'images/template/photo-1544025162-d76694265947.jpg',
            ],
            'udang-bakar' => [
                'name' => 'Udang Bakar',
                'category' => 'seafood',
                'price' => 35000,
                'description' => 'Udang segar dibakar dengan bumbu gurih manis.',
                'image' => 'images/template/photo-1565680018434-b513d5e5fd47.jpg',
            ],
            'cumi-saus-padang' => [
                'name' => 'Cumi Saus Padang',
                'category' => 'seafood',
                'price' => 45000,
                'description' => 'Cumi dengan saus pedas gurih yang kaya rasa.',
                'image' => 'images/template/photo-1565299507177-b0ac66763828.jpg',
            ],
            'gurame-bakar' => [
                'name' => 'Gurame Bakar',
                'category' => 'ikan',
                'price' => 75000,
                'description' => 'Gurame bakar dengan bumbu khas yang kaya rasa.',
                'image' => 'images/template/photo-1515003197210-e0cd71810b5f.jpg',
                'is_featured' => true,
            ],
            'nila-bakar' => [
                'name' => 'Nila Bakar',
                'category' => 'ikan',
                'price' => 25000,
                'description' => 'Ikan nila bakar dengan bumbu gurih.',
                'image' => 'images/template/photo-1515003197210-e0cd71810b5f.jpg',
            ],
            'cah-pakcoy-saus-tiram' => [
                'name' => 'Cah Pakcoy Saus Tiram',
                'category' => 'sayuran',
                'price' => 18000,
                'description' => 'Pakcoy segar dengan saus tiram gurih.',
                'image' => 'images/template/photo-1512621776951-a57141f2eefd.jpg',
            ],
            'genjer-cah-pedas' => [
                'name' => 'Genjer Cah Pedas',
                'category' => 'sayuran',
                'price' => 13000,
                'description' => 'Tumis genjer pedas dengan rasa segar.',
                'image' => 'images/template/photo-1512621776951-a57141f2eefd.jpg',
            ],
            'nasi-goreng-ayam' => [
                'name' => 'Nasi Goreng Ayam',
                'category' => 'nasi',
                'price' => 18000,
                'description' => 'Nasi goreng gurih dengan topping ayam.',
                'image' => 'images/template/photo-1603133872878-684f208fb84b.jpg',
            ],
            'nasi-goreng-seafood' => [
                'name' => 'Nasi Goreng Seafood',
                'category' => 'nasi',
                'price' => 20000,
                'description' => 'Nasi goreng dengan seafood pilihan.',
                'image' => 'images/template/photo-1603133872878-684f208fb84b.jpg',
            ],
            'es-teh-manis' => [
                'name' => 'Es Teh Manis',
                'category' => 'minuman',
                'price' => 5000,
                'description' => 'Segar dan cocok untuk setiap hidangan.',
                'image' => 'images/template/photo-1556679343-c7306c1976bc.jpg',
            ],
            'lemon-tea' => [
                'name' => 'Lemon Tea',
                'category' => 'minuman',
                'price' => 8000,
                'description' => 'Teh lemon yang ringan dan menyegarkan.',
                'image' => 'images/template/photo-1556679343-c7306c1976bc.jpg',
            ],
        ];

        foreach (array_keys($items) as $index => $key) {
            $item = $items[$key];
            $menu = MenuItem::query()->where('seed_key', $key)->first()
                ?? MenuItem::query()->firstOrNew(['name' => $item['name']]);

            $menu->forceFill([
                'is_published' => true,
                'is_available' => true,
                'is_featured' => false,
                'sort_order' => $index + 1,
                ...Arr::except($item, ['category', 'image']),
                'seed_key' => $key,
                'category_id' => $categories[$item['category']],
                'image_path' => $item['image'],
            ])->save();
        }
    }
}
