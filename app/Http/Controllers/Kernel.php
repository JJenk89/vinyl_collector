<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // ... other middleware
        \App\Http\Middleware\Cors::class,
    ];
}
