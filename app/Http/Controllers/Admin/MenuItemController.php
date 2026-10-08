<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminMenuFilterRequest;
use App\Http\Requests\MenuItemRequest;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class MenuItemController extends Controller
{
    public function index(AdminMenuFilterRequest $request): Response
    {
        return Inertia::render('admin/menu/index', [
            'items' => MenuItem::query()->with('category')
                ->when($request->input('status') === 'published', fn ($query) => $query->where('is_published', true))
                ->when($request->input('status') === 'draft', fn ($query) => $query->where('is_published', false))
                ->when($request->input('status') === 'unavailable', fn ($query) => $query->where('is_available', false))
                ->when($request->filled('search'), fn ($query) => $query->where('name', 'like', '%'.$request->string('search').'%'))
                ->when($request->filled('category'), fn ($query) => $query->whereHas('category', fn ($category) => $category->where('name', $request->string('category'))))
                ->orderBy('sort_order')->orderBy('id')->paginate(15)->withQueryString()
                ->through(fn (MenuItem $item) => [...$item->publicData(), 'is_published' => $item->is_published, 'sort_order' => $item->sort_order]),
            'categories' => MenuCategory::query()->orderBy('sort_order')->orderBy('id')->get(['id', 'name']),
            'filters' => $request->only('search', 'category', 'status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/menu/form', ['item' => null, 'categories' => MenuCategory::query()->orderBy('sort_order')->orderBy('id')->get(['id', 'name'])]);
    }

    public function store(MenuItemRequest $request): RedirectResponse
    {
        $this->save($request, new MenuItem);

        return to_route('admin.menu.index')->with('success', 'Menu berhasil ditambahkan.');
    }

    public function edit(MenuItem $menu): Response
    {
        return Inertia::render('admin/menu/form', [
            'item' => [...$menu->publicData(), 'is_published' => $menu->is_published, 'sort_order' => $menu->sort_order],
            'categories' => MenuCategory::query()->orderBy('sort_order')->orderBy('id')->get(['id', 'name']),
        ]);
    }

    public function update(MenuItemRequest $request, MenuItem $menu): RedirectResponse
    {
        $this->save($request, $menu);

        return to_route('admin.menu.index')->with('success', 'Perubahan menu berhasil disimpan.');
    }

    public function destroy(MenuItem $menu): RedirectResponse
    {
        $oldImage = $menu->image_path;
        $menu->delete();

        if ($oldImage) {
            Storage::disk('public')->delete($oldImage);
        }

        return to_route('admin.menu.index')->with('success', 'Menu berhasil dihapus.');
    }

    private function save(MenuItemRequest $request, MenuItem $menu): void
    {
        $oldImage = $menu->image_path;
        $newImage = $request->file('image')?->store('menu', 'public');
        abort_if($newImage === false, 500, 'Foto gagal disimpan. Silakan coba lagi.');
        $menu->fill($request->safe()->except(['image', 'remove_image']));

        if ($newImage) {
            $menu->image_path = $newImage;
        } elseif ($request->boolean('remove_image')) {
            $menu->image_path = null;
        }

        try {
            $menu->save();
        } catch (Throwable $exception) {
            if ($newImage) {
                Storage::disk('public')->delete($newImage);
            }

            throw $exception;
        }

        if ($oldImage && $oldImage !== $menu->image_path) {
            Storage::disk('public')->delete($oldImage);
        }
    }
}
