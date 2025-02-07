<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
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

        return redirect()->route('collection');
    }

    public function index()
    {
        // Retrieve user's collections
        $collections = Collection::all(['album_id', 'name', 'artist']);

        return Inertia::render('Collection', [
            'collections' => $collections,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function removeFromCollection(Request $request)
    {
        $albumData = json_decode($request->input('album'), true);

        // Remove album from collection
        Collection::where('album_id', $albumData['album_id'])->delete();



        return redirect()->back();
    }
}
