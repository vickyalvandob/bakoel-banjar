<?php

namespace App\Models;

use Database\Factories\MenuItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $name
 * @property int $category_id
 * @property-read MenuCategory $category
 * @property string|null $description
 * @property int $price
 * @property string|null $image_path
 * @property bool $is_published
 * @property bool $is_available
 * @property bool $is_featured
 * @property int $sort_order
 */
#[Fillable(['name', 'category_id', 'description', 'price', 'image_path', 'is_published', 'is_available', 'is_featured', 'sort_order'])]
class MenuItem extends Model
{
    /** @use HasFactory<MenuItemFactory> */
    use HasFactory;

    /** @return BelongsTo<MenuCategory, $this> */
    public function category(): BelongsTo
    {
        return $this->belongsTo(MenuCategory::class);
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['price' => 'integer', 'sort_order' => 'integer', 'is_published' => 'boolean', 'is_available' => 'boolean', 'is_featured' => 'boolean'];
    }

    /** @return array{id: int, name: string, category_id: int, category: string, description: ?string, price: int, image_url: ?string, is_available: bool, is_featured: bool} */
    public function publicData(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category_id' => $this->category_id,
            'category' => $this->category->name,
            'description' => $this->description,
            'price' => $this->price,
            'image_url' => $this->image_path
                ? (str_starts_with($this->image_path, 'images/') ? asset($this->image_path) : Storage::disk('public')->url($this->image_path))
                : null,
            'is_available' => $this->is_available,
            'is_featured' => $this->is_featured,
        ];
    }
}
