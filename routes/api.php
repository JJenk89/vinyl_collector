<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyAuthController;

Route::post('spotify/token', [SpotifyAuthController::class, 'getToken']);
