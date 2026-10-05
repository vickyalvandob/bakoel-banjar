<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuFilterRequest;
use App\Http\Requests\MenuItemRequest;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class MenuItemController extends Controller
{
    public function index(MenuFilterRequest $request): Response
    {
        return Inertia::render('admin/menu/index', [
            'items' => MenuItem::query()
                ->when($request->filled('search'), fn ($query) => $query->where('name', 'like', '%'.$request->string('search').'%'))
                ->when($request->filled('category'), fn ($query) => $query->where('category', $request->string('category')))
                ->orderBy('sort_order')->orderBy('id')->paginate(15)->withQueryString()
                ->through(fn (MenuItem $item) => [...$item->publicData(), 'is_published' => $item->is_published, 'sort_order' => $item->sort_order]),
            'categories' => MenuItem::CATEGORIES,
            'filters' => $request->only('search', 'category'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/menu/form', ['item' => null, 'categories' => MenuItem::CATEGORIES]);
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
            'categories' => MenuItem::CATEGORIES,
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
