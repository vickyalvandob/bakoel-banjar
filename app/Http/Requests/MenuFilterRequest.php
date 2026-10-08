<?php

namespace App\Http\Requests;

use App\Models\MenuCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuFilterRequest extends FormRequest
{
    /** @return array<string, array<mixed>> */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'],
            'category' => ['nullable', 'string', Rule::exists(MenuCategory::class, 'name')],
        ];
    }
}
