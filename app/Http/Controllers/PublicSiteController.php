<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuFilterRequest;
use App\Models\ContactSetting;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Inertia\Inertia;
use Inertia\Response;

class PublicSiteController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('public/home', [
            'contact' => ContactSetting::current()->publicData(),
            'featured' => MenuItem::query()->with('category')->where('is_published', true)->where('is_featured', true)
                ->orderBy('sort_order')->orderBy('id')->limit(4)->get()->map->publicData(),
        ]);
    }

    public function menu(MenuFilterRequest $request): Response
    {
        return Inertia::render('public/menu', [
            'contact' => ContactSetting::current()->publicData(),
            'items' => MenuItem::query()->with('category')->where('is_published', true)
                ->when($request->filled('search'), fn ($query) => $query->where('name', 'like', '%'.$request->string('search').'%'))
                ->when($request->filled('category'), fn ($query) => $query->whereHas('category', fn ($category) => $category->where('name', $request->string('category'))))
                ->orderBy('sort_order')->orderBy('id')->paginate(12)->withQueryString()->through(fn (MenuItem $item) => $item->publicData()),
            'categories' => MenuCategory::query()->orderBy('sort_order')->orderBy('id')->get(['id', 'name']),
            'filters' => $request->only('search', 'category'),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('public/services', ['contact' => ContactSetting::current()->publicData()]);
    }

    public function contact(): Response
    {
        return Inertia::render('public/contact', ['contact' => ContactSetting::current()->publicData()]);
    }

    public function about(): Response
    {
        return Inertia::render('public/about', ['contact' => ContactSetting::current()->publicData()]);
    }
}
