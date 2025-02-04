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

        return redirect()->back();
    }

    public function index()
    {
        // Retrieve user's wishlist
        $wishlist = Wishlist::all(['album_id', 'name', 'artist']);

        return Inertia::render('Wishlist/Index', [
            'wishlist' => $wishlist
        ]);
    }

    public function removeFromWishlist(Request $request)
    {
        $albumId = $request->input('album_id');

        // Remove album from wishlist
        Wishlist::where('album_id', $albumId)->delete();

        return response()->json(['success' => true]);

        return redirect()->back();
    }
}
