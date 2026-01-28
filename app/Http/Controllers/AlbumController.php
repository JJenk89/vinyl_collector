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
        $tokenResponse = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => env('SPOTIFY_CLIENT_ID'),
            'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        ]);

        $token = $tokenResponse->json()['access_token'];

        $albumResponse = Http::withToken($token)->get("https://api.spotify.com/v1/albums/{$id}");
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
