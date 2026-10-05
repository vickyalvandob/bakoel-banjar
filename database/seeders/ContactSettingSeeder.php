<?php

namespace Database\Seeders;

use App\Models\ContactSetting;
use Illuminate\Database\Seeder;

class ContactSettingSeeder extends Seeder
{
    public function run(): void
    {
        ContactSetting::query()->firstOrCreate(['key' => 'main'], [
            'address' => "Food Court Taman Semanan Indah\nSemanan, Jakarta Barat, DKI Jakarta.",
            'whatsapp' => '6285284588839',
            'instagram_url' => 'https://www.instagram.com/waroengayamduri',
            'maps_url' => 'https://www.google.com/maps/search/?api=1&query=Food+Court+Taman+Semanan+Indah+Jakarta+Barat',
        ]);
    }
}
