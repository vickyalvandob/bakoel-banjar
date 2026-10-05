<?php

namespace App\Models;

use Database\Factories\MenuItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $name
 * @property string $category
 * @property string|null $description
 * @property int $price
 * @property string|null $image_path
 * @property bool $is_published
 * @property bool $is_available
 * @property bool $is_featured
 * @property int $sort_order
 */
#[Fillable(['name', 'category', 'description', 'price', 'image_path', 'is_published', 'is_available', 'is_featured', 'sort_order'])]
class MenuItem extends Model
{
    /** @use HasFactory<MenuItemFactory> */
    use HasFactory;

    public const array CATEGORIES = ['Gami Spesial', 'Iga & Sapi', 'Ayam', 'Ayam Kampung', 'Bebek', 'Seafood', 'Ikan', 'Sayuran', 'Nasi', 'Minuman'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['price' => 'integer', 'sort_order' => 'integer', 'is_published' => 'boolean', 'is_available' => 'boolean', 'is_featured' => 'boolean'];
    }

    /** @return array{id: int, name: string, category: string, description: ?string, price: int, image_url: ?string, is_available: bool, is_featured: bool} */
    public function publicData(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'description' => $this->description,
            'price' => $this->price,
            'image_url' => $this->image_path ? Storage::disk('public')->url($this->image_path) : null,
            'is_available' => $this->is_available,
            'is_featured' => $this->is_featured,
        ];
    }
}
