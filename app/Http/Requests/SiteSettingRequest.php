<?php

namespace App\Http\Requests;

use App\Models\SiteSetting;
use Illuminate\Foundation\Http\FormRequest;

class SiteSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-content') ?? false;
    }

    /** @return array<string, array<string>> */
    public function rules(): array
    {
        $rules = [
            'meta_title' => ['nullable', 'string', 'max:120'],
            'meta_description' => ['nullable', 'string', 'max:320'],
        ];

        foreach (SiteSetting::IMAGE_FIELDS as $field) {
            $rules[$field] = $field === 'favicon'
                ? ['nullable', 'file', 'mimes:png,ico', 'max:1024']
                : ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'];
            $rules['remove_'.$field] = ['sometimes', 'boolean'];
        }

        return $rules;
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'meta_title.string' => 'Meta title harus berupa teks.',
            'meta_title.max' => 'Meta title maksimal 120 karakter.',
            'meta_description.string' => 'Meta description harus berupa teks.',
            'meta_description.max' => 'Meta description maksimal 320 karakter.',
            'favicon.mimes' => 'Favicon harus berupa file PNG atau ICO yang valid.',
            'favicon.max' => 'Ukuran favicon maksimal 1 MB.',
            '*.image' => 'Pilih gambar JPG, PNG, atau WebP yang valid.',
            '*.mimes' => 'Pilih gambar JPG, PNG, atau WebP yang valid.',
            '*.max' => 'Ukuran gambar maksimal 4 MB.',
            '*.uploaded' => 'Gambar gagal diunggah. Periksa ukuran file dan coba lagi.',
            '*.boolean' => 'Pilihan hapus gambar tidak valid.',
        ];
    }
}
