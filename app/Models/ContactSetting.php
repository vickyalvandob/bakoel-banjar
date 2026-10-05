<?php

namespace App\Models;

use Database\Factories\ContactSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string|null $address
 * @property string|null $whatsapp
 * @property string|null $email
 * @property string|null $opening_hours
 * @property string|null $maps_url
 * @property string|null $instagram_url
 */
#[Fillable(['key', 'address', 'whatsapp', 'email', 'opening_hours', 'maps_url', 'instagram_url'])]
class ContactSetting extends Model
{
    /** @use HasFactory<ContactSettingFactory> */
    use HasFactory;

    public static function current(): self
    {
        return static::query()->firstOrNew(['key' => 'main']);
    }

    /** @return array{address: ?string, whatsapp: ?string, email: ?string, opening_hours: ?string, maps_url: ?string, instagram_url: ?string} */
    public function publicData(): array
    {
        return [
            'address' => $this->address,
            'whatsapp' => $this->whatsapp,
            'email' => $this->email,
            'opening_hours' => $this->opening_hours,
            'maps_url' => $this->maps_url,
            'instagram_url' => $this->instagram_url,
        ];
    }
}
