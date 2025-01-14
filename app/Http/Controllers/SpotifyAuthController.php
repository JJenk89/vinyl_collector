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
}
