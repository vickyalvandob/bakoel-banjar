<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['name' => 'Ayam Sambal Gami', 'category' => 'Gami Spesial', 'price' => 22000, 'description' => 'Ayam gurih dengan sambal gami panas khas Banjar.', 'photo' => 'photo-1547592180-85f173990554'],
            ['name' => 'Bebek Gami', 'category' => 'Gami Spesial', 'price' => 35000, 'description' => 'Bebek empuk dengan sambal gami yang pedas dan wangi.', 'photo' => 'photo-1544025162-d76694265947'],
            ['name' => 'Udang Sambal Gami', 'category' => 'Gami Spesial', 'price' => 35000, 'description' => 'Udang segar dengan sambal gami pedas aromatik.', 'photo' => 'photo-1565680018434-b513d5e5fd47'],
            ['name' => 'Nila Gami', 'category' => 'Gami Spesial', 'price' => 25000, 'description' => 'Ikan nila dengan sambal gami gurih dan pedas.', 'photo' => 'photo-1515003197210-e0cd71810b5f'],
            ['name' => 'Iga Bakar Saus BBQ', 'category' => 'Iga & Sapi', 'price' => 50000, 'description' => 'Iga sapi bakar dengan saus BBQ yang manis gurih.', 'photo' => 'photo-1544025162-d76694265947'],
            ['name' => 'Sapi Lada Hitam', 'category' => 'Iga & Sapi', 'price' => 50000, 'description' => 'Daging sapi dengan lada hitam dan saus gurih.', 'photo' => 'photo-1558030006-450675393462'],
            ['name' => 'Ayam Bakar Madu', 'category' => 'Ayam', 'price' => 18000, 'description' => 'Ayam bakar dengan sentuhan madu yang manis gurih.', 'photo' => 'photo-1532550907401-a500c9a57435'],
            ['name' => 'Ayam Rica-Rica', 'category' => 'Ayam', 'price' => 25000, 'description' => 'Pedas aromatik dengan bumbu yang meresap.', 'photo' => 'photo-1604908176997-125f25cc6f3d'],
            ['name' => 'Ayam Kampung Goreng', 'category' => 'Ayam Kampung', 'price' => 25000, 'description' => 'Ayam kampung goreng dengan tekstur gurih.', 'photo' => 'photo-1562967914-608f82629710'],
            ['name' => 'Ayam Kampung Kecap', 'category' => 'Ayam Kampung', 'price' => 35000, 'description' => 'Manis gurih, cocok untuk makan bersama.', 'photo' => 'photo-1601050690597-df0568f70950'],
            ['name' => 'Bebek Goreng', 'category' => 'Bebek', 'price' => 30000, 'description' => 'Bebek goreng gurih dengan tekstur renyah.', 'photo' => 'photo-1598514983318-2f64f8f4796c'],
            ['name' => 'Bebek Rica-Rica', 'category' => 'Bebek', 'price' => 35000, 'description' => 'Bebek dengan rica-rica pedas yang kaya rempah.', 'photo' => 'photo-1544025162-d76694265947'],
            ['name' => 'Udang Bakar', 'category' => 'Seafood', 'price' => 35000, 'description' => 'Udang segar dibakar dengan bumbu gurih manis.', 'photo' => 'photo-1565680018434-b513d5e5fd47'],
            ['name' => 'Cumi Saus Padang', 'category' => 'Seafood', 'price' => 45000, 'description' => 'Cumi dengan saus pedas gurih yang kaya rasa.', 'photo' => 'photo-1565299507177-b0ac66763828'],
            ['name' => 'Gurame Bakar', 'category' => 'Ikan', 'price' => 75000, 'description' => 'Gurame bakar dengan bumbu khas yang kaya rasa.', 'photo' => 'photo-1515003197210-e0cd71810b5f'],
            ['name' => 'Nila Bakar', 'category' => 'Ikan', 'price' => 25000, 'description' => 'Ikan nila bakar dengan bumbu gurih.', 'photo' => 'photo-1515003197210-e0cd71810b5f'],
            ['name' => 'Cah Pakcoy Saus Tiram', 'category' => 'Sayuran', 'price' => 18000, 'description' => 'Pakcoy segar dengan saus tiram gurih.', 'photo' => 'photo-1512621776951-a57141f2eefd'],
            ['name' => 'Genjer Cah Pedas', 'category' => 'Sayuran', 'price' => 13000, 'description' => 'Tumis genjer pedas dengan rasa segar.', 'photo' => 'photo-1512621776951-a57141f2eefd'],
            ['name' => 'Nasi Goreng Ayam', 'category' => 'Nasi', 'price' => 18000, 'description' => 'Nasi goreng gurih dengan topping ayam.', 'photo' => 'photo-1603133872878-684f208fb84b'],
            ['name' => 'Nasi Goreng Seafood', 'category' => 'Nasi', 'price' => 20000, 'description' => 'Nasi goreng dengan seafood pilihan.', 'photo' => 'photo-1603133872878-684f208fb84b'],
            ['name' => 'Es Teh Manis', 'category' => 'Minuman', 'price' => 5000, 'description' => 'Segar dan cocok untuk setiap hidangan.', 'photo' => 'photo-1556679343-c7306c1976bc'],
            ['name' => 'Lemon Tea', 'category' => 'Minuman', 'price' => 8000, 'description' => 'Teh lemon yang ringan dan menyegarkan.', 'photo' => 'photo-1556679343-c7306c1976bc'],
        ];

        foreach ($items as $index => $item) {
            if (MenuItem::query()->where('name', $item['name'])->exists()) {
                continue;
            }

            $source = public_path('images/template/'.$item['photo'].'.jpg');
            $imagePath = 'menu/examples/'.Str::slug($item['name']).'.jpg';

            if (is_file($source)) {
                Storage::disk('public')->put($imagePath, File::get($source));
            }

            unset($item['photo']);

            MenuItem::query()->create([
                ...$item,
                'image_path' => is_file($source) ? $imagePath : null,
                'is_published' => true,
                'is_available' => true,
                'is_featured' => in_array($item['name'], ['Ayam Sambal Gami', 'Bebek Goreng', 'Udang Sambal Gami', 'Gurame Bakar']),
                'sort_order' => $index + 1,
            ]);
        }
    }
}
