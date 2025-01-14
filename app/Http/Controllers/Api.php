<?php

use Illuminate\Support\Facades\Http;

class ApiController
{
    public function getSpotifyToken()
    {

        dd([
            'env_client_id' => env('SPOTIFY_CLIENT_ID'),
            'config_client_id' => config('services.spotify.client_id'),
            'env_client_secret' => env('SPOTIFY_CLIENT_SECRET'),
            'config_client_secret' => config('services.spotify.client_secret')
        ]);

        $response = Http::withHeaders([
            'Content-Type' => 'application/x-www-form-urlencoded',
        ])->asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => env('SPOTIFY_CLIENT_ID'),
            'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        ]);

        return $response->json();
    }
}
