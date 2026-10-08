<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuCategoryRequest;
use App\Models\MenuCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class MenuCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/categories', [
            'categories' => MenuCategory::query()->withCount('items')
                ->orderBy('sort_order')->orderBy('id')
                ->get(['id', 'name', 'sort_order']),
        ]);
    }

    public function store(MenuCategoryRequest $request): RedirectResponse
    {
        MenuCategory::query()->create($request->validated());

        return to_route('admin.categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(MenuCategoryRequest $request, MenuCategory $category): RedirectResponse
    {
        $category->update($request->validated());

        return to_route('admin.categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(MenuCategory $category): RedirectResponse
    {
        DB::transaction(function () use ($category): void {
            $category = MenuCategory::query()->lockForUpdate()->findOrFail($category->id);

            if ($category->items()->exists()) {
                throw ValidationException::withMessages([
                    'category' => 'Pindahkan atau hapus menu di kategori ini terlebih dahulu.',
                ]);
            }

            $category->delete();
        });

        return to_route('admin.categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
