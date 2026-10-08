<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SiteSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        $settings = SiteSetting::current();

        return Inertia::render('admin/settings', [
            'customImages' => array_values(array_filter(SiteSetting::IMAGE_FIELDS, fn (string $field): bool => (bool) $settings->getAttribute($field.'_path'))),
        ]);
    }

    public function update(SiteSettingRequest $request): RedirectResponse
    {
        $newImages = [];
        $oldImages = [];

        try {
            foreach (SiteSetting::IMAGE_FIELDS as $field) {
                if ($request->hasFile($field)) {
                    $path = $request->file($field)->store('site', 'public');
                    abort_if($path === false, 500, 'Gambar gagal disimpan. Silakan coba lagi.');
                    $newImages[$field] = $path;
                }
            }

            DB::transaction(function () use ($request, $newImages, &$oldImages): void {
                SiteSetting::query()->firstOrCreate(['key' => 'main']);
                $settings = SiteSetting::query()->where('key', 'main')->lockForUpdate()->firstOrFail();
                $settings->fill($request->safe()->only(['meta_title', 'meta_description']));

                foreach (SiteSetting::IMAGE_FIELDS as $field) {
                    if (isset($newImages[$field]) || $request->boolean('remove_'.$field)) {
                        $oldPath = $settings->getAttribute($field.'_path');
                        if ($oldPath) {
                            $oldImages[] = $oldPath;
                        }
                        $settings->setAttribute($field.'_path', $newImages[$field] ?? null);
                    }
                }

                $settings->save();
            });
        } catch (Throwable $exception) {
            Storage::disk('public')->delete(array_values($newImages));

            throw $exception;
        }

        Storage::disk('public')->delete($oldImages);

        return to_route('admin.settings.edit')->with('success', 'Pengaturan website berhasil disimpan.');
    }
}
