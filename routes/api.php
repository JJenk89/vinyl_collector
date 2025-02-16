<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyAuthController;

//TODO put token call behind auth middleware
/* Route::middleware('auth:sanctum', function () {
    Route::post('spotify/token', [SpotifyAuthController::class, 'getToken']);
}); */

Route::post('spotify/token', [SpotifyAuthController::class, 'getToken']);

Route::get('spotify/search', [SpotifyAuthController::class, 'search']);
