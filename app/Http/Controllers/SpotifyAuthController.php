<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SpotifyAuthController extends Controller
{
    public function getToken()
    {
        $clientId = config('services.spotify.client_id');
        $clientSecret = config('services.spotify.client_secret');

        Log::info('Spotify credentials:', [
            'clientId' => $clientId,
            'clientSecret' => substr($clientSecret, 0, 4) . '****' // Log only first 4 chars for security
        ]);

        $response = Http::withHeaders([
            'Content-Type' => 'application/x-www-form-urlencoded',
            'Authorization' => 'Basic ' . base64_encode($clientId . ':' . $clientSecret)
        ])->asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials'
        ]);

        Log::info('Spotify response:', ['response' => $response->json()]);

        return $response->json();
    }

    public function search(Request $request)
    {
        // Validate the request
        $request->validate([
            'query' => 'required|string',
            'type' => 'required|string',
        ]);

        // Get the access token (you can reuse the token logic from your existing route)
        $tokenResponse = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => env('SPOTIFY_CLIENT_ID'),
            'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        ]);

        $accessToken = $tokenResponse->json()['access_token'];

        // Make the search request to Spotify
        $response = Http::withToken($accessToken)
            ->get('https://api.spotify.com/v1/search', [
                'q' => $request->input('query'),
                'type' => $request->input('type'),
                'limit' => 20
            ]);

        // Return the Spotify API response to the frontend
        return $response->json();
    }
}
