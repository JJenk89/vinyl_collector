<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Wishlist;

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

        return redirect()->back()->with('message', 'Album added to wishlist');
    }

    public function index()
    {
        // Retrieve user's wishlist
        $wishlist = Wishlist::all();

        return Inertia::render('Wishlist/Index', [
            'wishlist' => $wishlist
        ]);
    }
}
