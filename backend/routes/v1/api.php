<?php

use App\Http\Controllers\api\v1\AuthController;
use App\Http\Middleware\ApiJsonResponse;
use Illuminate\Support\Facades\Route;

Route::get('/test', function() {
    
})->middleware([ApiJsonResponse::class]);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum', ApiJsonResponse::class])->group(
	base_path('routes/v1/protected.php'),
);

Route::middleware([ApiJsonResponse::class])->group(
	base_path('routes/v1/public.php'),
);