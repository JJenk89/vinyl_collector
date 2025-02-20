<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CollectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\SearchController;

//shows individual album based on spotify id
Route::get('/album/{id}', [AlbumController::class, 'show']);

//home
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//collection controllers
Route::middleware(['auth'])->group(function () {
    Route::post('/collection', [CollectionController::class, 'addToCollection']);
    Route::delete('/collection/remove', [CollectionController::class, 'removeFromCollection']);
});

//Index not under auth. A frontend guard is in place
//the frontend Collection.tsx component conditionally renders based on usePage props
Route::get('/collection', [CollectionController::class, 'index'])
    ->name('collection');


//wishlist controllers
Route::middleware(['auth'])->group(function () {
    Route::post('/wishlist', [WishlistController::class, 'addToWishlist']);
    Route::delete('/wishlist/remove', [WishlistController::class, 'removeFromWishlist']);
});

//Index not under auth. A frontend guard is in place
//the frontend Wishlist.tsx component conditionally renders based on usePage props
Route::get('/wishlist', [WishlistController::class, 'index'])
    ->name('wishlist');


//search for album page
Route::get('/search', [SearchController::class, 'index'])->name('search');


//user registration
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest', 'throttle:6,1'])
    ->name('register');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
