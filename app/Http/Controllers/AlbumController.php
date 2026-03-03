<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Wishlist;
use App\Models\Collection;

class AlbumController extends Controller
{
    public function show($id)
    {

        $albumResponse = Http::withHeaders([
            'User-Agent' => config('app.name') . '/1.0',
        ])->get("https://api.discogs.com/releases/{$id}", [
            'key' => config('services.discogs.consumer_key'),
            'secret' => config('services.discogs.consumer_secret'),
        ]);

        $album = $albumResponse->json();

        // Get user's existing wishlist and collection album IDs
        $userWishlistIds = [];
        $userCollectionIds = [];

        if (Auth::check()) {
            $userWishlistIds = Wishlist::where('user_id', Auth::id())
                ->pluck('album_id')
                ->toArray();

            $userCollectionIds = Collection::where('user_id', Auth::id())
                ->pluck('album_id')
                ->toArray();
        }

        return Inertia::render('album/Show', [
            'album' => $album,
            'userWishlistIds' => $userWishlistIds,
            'userCollectionIds' => $userCollectionIds,
        ]);
    }
}
