<?php

namespace App\Models;

use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property string|null $logo_path
 * @property string|null $favicon_path
 * @property string|null $meta_image_path
 * @property string|null $home_image_path
 * @property string|null $about_image_path
 */
#[Fillable(['key', 'meta_title', 'meta_description', 'logo_path', 'favicon_path', 'meta_image_path', 'home_image_path', 'about_image_path'])]
class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory;

    public const IMAGE_FIELDS = ['logo', 'favicon', 'meta_image', 'home_image', 'about_image'];

    public static function current(): self
    {
        return static::query()->firstOrNew(['key' => 'main']);
    }

    /** @return array{meta_title: ?string, meta_description: ?string, logo_url: ?string, favicon_url: string, meta_image_url: string, home_image_url: string, about_image_url: string} */
    public function publicData(): array
    {
        $homeImage = $this->imageUrl($this->home_image_path) ?? asset('images/Bakoel%20Banjar%20Spicy%20Seafood%20Feast.webp');

        return [
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'logo_url' => $this->imageUrl($this->logo_path),
            'favicon_url' => $this->imageUrl($this->favicon_path) ?? asset('favicon.svg'),
            'meta_image_url' => $this->imageUrl($this->meta_image_path) ?? $homeImage,
            'home_image_url' => $homeImage,
            'about_image_url' => $this->imageUrl($this->about_image_path) ?? asset('images/Bakoel%20Banjar%20Family%20Feast.png'),
        ];
    }

    private function imageUrl(?string $path): ?string
    {
        return $path ? url(Storage::disk('public')->url($path)) : null;
    }
}
