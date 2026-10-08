<?php

use App\Http\Controllers\Admin\ContactSettingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenuCategoryController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\PublicSiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicSiteController::class, 'home'])->name('home');
Route::get('/menu', [PublicSiteController::class, 'menu'])->name('menu');
Route::get('/layanan', [PublicSiteController::class, 'services'])->name('services');
Route::get('/kontak', [PublicSiteController::class, 'contact'])->name('contact');
Route::get('/tentang', [PublicSiteController::class, 'about'])->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => auth()->user()->can('manage-content') ? to_route('admin.dashboard') : to_route('home'))->name('dashboard');
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'can:manage-content'])->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::resource('menu', MenuItemController::class)->except('show');
    Route::resource('categories', MenuCategoryController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('kontak', [ContactSettingController::class, 'edit'])->name('contact.edit');
    Route::put('kontak', [ContactSettingController::class, 'update'])->name('contact.update');
});

require __DIR__.'/settings.php';
