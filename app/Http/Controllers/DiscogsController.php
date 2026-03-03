<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiscogsController extends Controller
{
    private string $apiUrl = 'https://api.discogs.com/database/search';

    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|max:200',
            'type'  => 'nullable|string|in:release,master,artist,label',
        ]);

        $queryParams = [
            'q'    => $request->input('query'),
            'type' => $request->input('type', 'release'),
            'key'  => config('services.discogs.consumer_key'),
            'secret' => config('services.discogs.consumer_secret'),
        ];

        Log::info('Discogs search request', [
            'query' => $queryParams['q'],
            'type'  => $queryParams['type'],
        ]);

        $response = Http::withHeaders([
            'User-Agent' => config('app.name') . '/1.0',
        ])->get($this->apiUrl, $queryParams);

        if ($response->failed()) {
            Log::error('Discogs API error', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            return response()->json([
                'error'   => 'Discogs API request failed',
                'details' => $response->json(),
            ], $response->status());
        }

        $data = $response->json();

        return $data;
    }

    public function getRelease($releaseId)
    {
        $response = Http::withHeaders([
            'User-Agent' => config('app.name') . '/1.0',
        ])->get("https://api.discogs.com/releases/{$releaseId}", [
            'key' => config('services.discogs.consumer_key'),
            'secret' => config('services.discogs.consumer_secret'),
        ]);

        if ($response->failed()) {
            Log::error('Discogs API error', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            return response()->json([
                'error'   => 'Discogs API request failed',
                'details' => $response->json(),
            ], $response->status());
        }

        return $response->json();
    }
}
