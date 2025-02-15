<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;

class WishlistController extends Controller
{
    public function addToWishlist(Request $request)
    {
        $albumData = json_decode($request->input('album'), true);

        // Create or find existing wishlist entry
        Wishlist::create([
            'album_id' => $albumData['id'],
            'name' => $albumData['name'],
            'artist' => $albumData['artists'][0]['name']
        ]);

        return redirect()->route('wishlist');
    }

    public function index()
    {
        // Retrieve user's wishlist
        //auth check before retrieval of wishlist
        if (Auth::user()) {
            $wishlist = Auth::user()->wishlist ?? [];
        } else {
            $wishlist = [];
        }

        return Inertia::render('Wishlist', [
            'wishlist' => $wishlist,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function removeFromWishlist(Request $request)
    {
        $albumData = json_decode($request->input('album'), true);

        // Remove album from wishlist
        Wishlist::where('album_id', $albumData['album_id'])->delete();



        return redirect()->route('wishlist');
    }
}
