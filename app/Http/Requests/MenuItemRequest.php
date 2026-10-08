<?php

namespace App\Http\Requests;

use App\Models\MenuCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-content') ?? false;
    }

    /** @return array<string, array<mixed>> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'category_id' => ['required', 'integer', Rule::exists(MenuCategory::class, 'id')],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'integer', 'min:0', 'max:100000000'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096', 'dimensions:max_width=6000,max_height=6000'],
            'remove_image' => ['sometimes', 'boolean'],
            'is_published' => ['required', 'boolean'],
            'is_available' => ['required', 'boolean'],
            'is_featured' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'between:0,65535'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama menu wajib diisi.',
            'name.max' => 'Nama menu maksimal 120 karakter.',
            'category_id.required' => 'Pilih kategori menu yang tersedia.',
            'category_id.exists' => 'Pilih kategori menu yang tersedia.',
            'price.required' => 'Harga menu wajib diisi.',
            'price.integer' => 'Harga harus berupa Rupiah tanpa desimal.',
            'price.min' => 'Harga tidak boleh negatif.',
            'price.max' => 'Harga maksimal Rp100.000.000.',
            'image.image' => 'Unggah file gambar yang valid.',
            'image.mimes' => 'Foto harus berupa JPG, PNG, atau WebP.',
            'image.max' => 'Ukuran foto maksimal 4 MB.',
            'image.dimensions' => 'Dimensi foto maksimal 6000 × 6000 piksel.',
            'sort_order.between' => 'Urutan harus antara 0 dan 65535.',
        ];
    }
}
