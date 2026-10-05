<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-content') ?? false;
    }

    protected function prepareForValidation(): void
    {
        if (is_string($this->input('whatsapp'))) {
            $number = preg_replace('/[\s()+-]/', '', $this->input('whatsapp'));
            $this->merge(['whatsapp' => str_starts_with($number, '0') ? '62'.substr($number, 1) : ($number ?: null)]);
        }
    }

    /** @return array<string, array<string>> */
    public function rules(): array
    {
        return [
            'address' => ['nullable', 'string', 'max:1000'],
            'whatsapp' => ['nullable', 'string', 'regex:/^[1-9][0-9]{8,14}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'opening_hours' => ['nullable', 'string', 'max:1000'],
            'maps_url' => ['nullable', 'url:https', 'max:1000'],
            'instagram_url' => ['nullable', 'url:https', 'max:1000'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'whatsapp.regex' => 'Masukkan nomor WhatsApp yang valid, misalnya 081234567890.',
            'email.email' => 'Masukkan alamat email yang valid.',
            'maps_url.url' => 'Tautan lokasi harus menggunakan https://.',
            'instagram_url.url' => 'Tautan Instagram harus menggunakan https://.',
        ];
    }
}
