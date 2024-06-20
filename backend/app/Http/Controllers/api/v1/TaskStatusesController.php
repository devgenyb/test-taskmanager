<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\Status\StatusCollection;
use App\Models\TaskStatus;

class TaskStatusesController extends Controller
{
    public function __invoke()
    {
        $data = TaskStatus::all();
        return new StatusCollection($data);
    }
}
