<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSetting;
use App\Models\MenuItem;
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
            ],
            'contact' => ContactSetting::current()->publicData(),
        ]);
    }
}
