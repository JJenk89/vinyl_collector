<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use App\Models\Collection;
use App\Models\Wishlist;

class CollectionController extends Controller
{

    public function addToCollection(Request $request)
    {
        $albumData = json_decode($request->input('album'), true);

        // Create or find existing collection entry
        Collection::create([
            'user_id' => Auth::id(),
            'album_id' => $albumData['id'],
            'name' => $albumData['name'],
            'artist' => $albumData['artists'][0]['name']
        ]);

        if ($request->boolean('removeFromWishlist')) {
            // Remove from wishlist if user adds it to collection
            Wishlist::where([
                'album_id' => $albumData['id'],
                'user_id' => Auth::id()
            ])->delete();
        }

        return redirect()->route('collection');
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



        return redirect()->back();
    }
}
