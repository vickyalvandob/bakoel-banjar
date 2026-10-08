<?php

namespace App\Models;

use Database\Factories\MenuCategoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property int $sort_order
 */
#[Fillable(['name', 'sort_order'])]
class MenuCategory extends Model
{
    /** @use HasFactory<MenuCategoryFactory> */
    use HasFactory;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['sort_order' => 'integer'];
    }

    /** @return HasMany<MenuItem, $this> */
    public function items(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'category_id');
    }
}
