<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\ParseDiscogsData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use App\Models\Collection;
use App\Models\Wishlist;

class CollectionController extends Controller
{
    use ParseDiscogsData;

    public function addToCollection(Request $request)
    {
        $albumData = json_decode($request->input('album'), true);

        // Show error if album is already in collection
        $existingCollectionItem = Collection::where([
            'album_id' => $albumData['id'],
            'user_id' => Auth::id()
        ])->exists();

        if ($existingCollectionItem) {
            return back()->withErrors(['collection' => 'Album is already in your collection!']);
        }

        // Create or find existing collection entry
        Collection::create([
            'user_id' => Auth::id(),
            'album_id' => $albumData['id'],
            'title' => $this->parseAlbumTitle($albumData),
            'label' => $this->parseLabel($albumData),
            'artist' => $this->parseArtist($albumData),
            'cover_url' => $this->parseCoverUrl($albumData),
        ]);

        if ($request->boolean('removeFromWishlist')) {
            // Remove from wishlist if user adds it to collection
            Wishlist::where([
                'album_id' => $albumData['id'],
                'user_id' => Auth::id()
            ])->delete();
        }

        return back();
    }

    public function index()
    {

        //auth check before retrieval of collection
        if (Auth::user()) {
            $collections = Auth::user()->collections ?? [];
        } else {
            $collections = [];
        }

        return Inertia::render('Collection', [
            'collections' => $collections,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function removeFromCollection(Request $request)
    {

        $validated = $request->validate([
            'album_id' => 'required',
        ]);

        // Remove album from collection
        Collection::where([
            'album_id' => $validated['album_id'],
            'user_id' => Auth::id()
        ])->delete();



        return back();
    }
}
