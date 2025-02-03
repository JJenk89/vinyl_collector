<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

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

        return Inertia::render('album/Show', [
            'album' => $album,
        ]);
    }
}
