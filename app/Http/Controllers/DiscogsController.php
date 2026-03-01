<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiscogsController extends Controller
{
    private string $apiUrl = 'https://api.discogs.com/database/search';

    /**
     * Build the OAuth 1.0a Authorization header (2-legged, no access token).
     */
    private function buildOAuthHeader(string $method, string $url, array $queryParams = []): string
    {
        $consumerKey    = config('services.discogs.consumer_key');
        $consumerSecret = config('services.discogs.consumer_secret');

        $oauthParams = [
            'oauth_consumer_key'     => $consumerKey,
            'oauth_nonce'            => bin2hex(random_bytes(16)),
            'oauth_signature_method' => 'HMAC-SHA1',
            'oauth_timestamp'        => (string) time(),
            'oauth_version'          => '1.0',
        ];

        // Signature base string must include ALL request params (oauth + query)
        $allParams = array_merge($oauthParams, $queryParams);
        ksort($allParams);

        $encodedParams = http_build_query($allParams, '', '&', PHP_QUERY_RFC3986);

        $baseString = implode('&', [
            strtoupper($method),
            rawurlencode($url),
            rawurlencode($encodedParams),
        ]);

        // 2-legged: signing key has no access token secret, so trailing & is intentional
        $signingKey = rawurlencode($consumerSecret) . '&';
        $signature  = base64_encode(hash_hmac('sha1', $baseString, $signingKey, true));

        $oauthParams['oauth_signature'] = $signature;

        // Build the Authorization header string
        $headerParts = array_map(
            fn($k, $v) => rawurlencode($k) . '="' . rawurlencode($v) . '"',
            array_keys($oauthParams),
            $oauthParams
        );

        return 'OAuth ' . implode(', ', $headerParts);
    }

    /**
     * Search Discogs database.
     * Supported types: release, master, artist, label
     */
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|max:200',
            'type'  => 'nullable|string',
        ]);

        $queryParams = [
            'q'    => $request->input('query'),
            'type' => $request->input('type', 'release'),
        ];

        $oauthHeader = $this->buildOAuthHeader('GET', $this->apiUrl, $queryParams);

        Log::info('Discogs search request', [
            'query' => $queryParams['q'],
            'type'  => $queryParams['type'],
        ]);

        $response = Http::withHeaders([
            'Authorization' => $oauthHeader,
            'User-Agent'    => config('app.name') . '/1.0',
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

        Log::info('Discogs search response', ['status' => $response->status()]);

        return $response->json();
    }
}
