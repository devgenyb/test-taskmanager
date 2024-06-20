<?php

use App\Http\Controllers\api\v1\TaskStatusesController;
use Illuminate\Support\Facades\Route;

Route::get('task-statuses', TaskStatusesController::class);

