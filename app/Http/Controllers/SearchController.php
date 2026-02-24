<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use App\Models\Collection;
use App\Models\Wishlist;

class SearchController extends Controller
{
    public function index()
    {
        if (Auth::user()) {
            $userCollectionIds = Auth::user()->collections->pluck('album_id')->toArray() ?? [];
            $userWishlistIds = Auth::user()->wishlist->pluck('album_id')->toArray() ?? [];
        } else {
            $userCollectionIds = [];
            $userWishlistIds = [];
        }

        return Inertia::render('Search', [
            'userCollectionIds' => $userCollectionIds,
            'userWishlistIds' => $userWishlistIds,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
