<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $site = SiteSetting::current()->publicData();
        $pageTitle = match ($request->route()?->getName()) {
            'home' => 'Beranda',
            'menu' => 'Menu',
            'services' => 'Layanan',
            'about' => 'Tentang',
            'contact' => 'Kontak',
            default => null,
        };

        return [
            ...parent::share($request),
            'site' => $site,
            'seo' => $pageTitle ? [
                'title' => $request->routeIs('home') && $site['meta_title']
                    ? $site['meta_title']
                    : $pageTitle.' - '.($site['meta_title'] ?: 'Bakoel Banjar'),
                'description' => $site['meta_description'] ?: 'Temukan menu Bakoel Banjar, lihat harga, dan pesan langsung melalui WhatsApp. Hidangan untuk makan sehari-hari dan bersama keluarga.',
                'image' => $site['meta_image_url'],
                'url' => $request->url(),
            ] : null,
            'name' => config('app.name'),
            'flash' => ['success' => fn () => $request->session()->get('success')],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
