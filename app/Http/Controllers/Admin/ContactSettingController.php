<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactSettingRequest;
use App\Models\ContactSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactSettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('admin/contact', ['contact' => ContactSetting::current()->publicData()]);
    }

    public function update(ContactSettingRequest $request): RedirectResponse
    {
        ContactSetting::query()->updateOrCreate(['key' => 'main'], $request->validated());

        return to_route('admin.contact.edit')->with('success', 'Informasi kontak berhasil diperbarui.');
    }
}
