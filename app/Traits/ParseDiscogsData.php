<?php

namespace App\Traits;

trait ParseDiscogsData
{
    protected function parseArtist(array $albumData): string
    {
        if (!empty($albumData['artists'][0]['name'])) {
            $name = $albumData['artists'][0]['name'];
            return preg_replace('/\s*\(.*?\)\s*/', '', $name);
        }

        if (!empty($albumData['title']) && str_contains($albumData['title'], ' - ')) {
            return explode(' - ', $albumData['title'])[0];
        }
        return 'Unknown Artist';
    }

    protected function parseAlbumTitle(array $albumData): string
    {
        if (!empty($albumData['title']) && str_contains($albumData['title'], ' - ')) {
            return trim(explode(' - ', $albumData['title'])[1]);
        }
        return $albumData['title'] ?? 'Unknown Title';
    }

    protected function parseCoverUrl(array $albumData): string
    {
        return $albumData['images'][0]['resource_url']
            ?? $albumData['cover_image']
            ?? $albumData['thumb']
            ?? 'No cover available';
    }

    protected function parseLabel(array $albumData): string
    {
        $label = $albumData['label'][0] ?? $albumData['label'] ?? 'Unknown Label';
        return is_string($label) ? $label : null;
    }
}
