<?php

namespace Database\Factories;

use App\Models\ContactSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<ContactSetting> */
class ContactSettingFactory extends Factory
{
    /** @return array<string, mixed> */
    public function definition(): array
    {
        return [
            'key' => 'main',
            'address' => fake()->address(),
            'whatsapp' => '6281234567890',
            'email' => 'hello@example.com',
            'opening_hours' => 'Senin–Sabtu, 09.00–20.00',
        ];
    }
}
