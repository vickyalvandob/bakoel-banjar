<?php

namespace App\Http\Requests;

use App\Models\MenuCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-content') ?? false;
    }

    /** @return array<string, array<mixed>> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:40', Rule::unique(MenuCategory::class)->ignore($this->route('category'))],
            'sort_order' => ['required', 'integer', 'between:0,65535'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama kategori wajib diisi.',
            'name.max' => 'Nama kategori maksimal 40 karakter.',
            'name.unique' => 'Nama kategori sudah digunakan.',
            'sort_order.required' => 'Urutan tampil wajib diisi.',
            'sort_order.integer' => 'Urutan harus berupa bilangan bulat.',
            'sort_order.between' => 'Urutan harus antara 0 dan 65535.',
        ];
    }
}
