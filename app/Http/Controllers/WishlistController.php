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

        // Show error if album is already in wishlist
        $existingWishlistItem = Wishlist::where([
            'album_id' => $albumData['id'],
            'user_id' => Auth::id()
        ])->exists();

        if ($existingWishlistItem) {
            return back()->withErrors(['wishlist' => 'Album is already in your wishlist!']);
        }

        //matching auth user to add to wishlist
        Wishlist::create([
            'user_id' => Auth::id(),
            'album_id' => $albumData['id'],
            'name' => $albumData['name'],
            'artist' => $albumData['artists'][0]['name'],
            'cover_url' => $albumData['images'][0]['url'] ?? null
        ]);




        return back();
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

        $validated = $request->validate([
            'album_id' => 'required',
        ]);

        // Remove album from wishlist
        Wishlist::where([
            'album_id' => $validated['album_id'],
            'user_id' => Auth::id()
        ])->delete();



        return back();
    }
}
