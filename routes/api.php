<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiscogsController;

Route::get('discogs/search', [DiscogsController::class, 'search']);
Route::get('discogs/release/{id}', [DiscogsController::class, 'getRelease']);
