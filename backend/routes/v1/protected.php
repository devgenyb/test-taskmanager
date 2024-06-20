<?php

use App\Http\Controllers\api\v1\TaskController;
use Illuminate\Support\Facades\Route;

Route::controller(TaskController::class)->prefix('task')->group(function() {
    Route::get('/', 'index');
    Route::get('/{id}', 'get');
    Route::post('/', 'create');
    Route::put('/', 'update');
});