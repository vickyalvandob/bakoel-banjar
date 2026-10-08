<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class AdminMenuFilterRequest extends MenuFilterRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-content') ?? false;
    }

    /** @return array<string, array<mixed>> */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'status' => ['nullable', Rule::in(['published', 'draft', 'unavailable'])],
        ];
    }
}
