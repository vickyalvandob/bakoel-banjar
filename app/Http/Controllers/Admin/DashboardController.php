<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSetting;
use App\Models\MenuItem;
use App\Models\MenuCategory;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total' => MenuItem::query()->count(),
                'published' => MenuItem::query()->where('is_published', true)->count(),
                'featured' => MenuItem::query()->where('is_published', true)->where('is_featured', true)->count(),
                'categories' => MenuCategory::query()->count(),
            ],
            'recent' => MenuItem::query()->with('category')->orderByDesc('updated_at')->orderByDesc('id')->limit(5)->get()
                ->map(fn (MenuItem $item) => [...$item->publicData(), 'is_published' => $item->is_published]),
            'contact' => ContactSetting::current()->publicData(),
        ]);
    }
}
