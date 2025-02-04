<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Collection;

class CollectionController extends Controller
{
    public function addToCollection(Request $request)
    {
        $albumData = json_decode($request->input('album'), true);

        // Create or find existing collection entry
        Collection::create([
            'album_id' => $albumData['id'],
            'name' => $albumData['name'],
            'artist' => $albumData['artists'][0]['name']
        ]);

        return redirect()->back()->with('message', 'Album added to collection');
    }

    public function index()
    {
        // Retrieve user's collections
        $collections = Collection::all();

        return Inertia::render('Collection/Index', [
            'collections' => $collections
        ]);
    }
}
