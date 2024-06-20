<?php

namespace App\Http\Controllers\api\v1;

use App\Exceptions\UnauthorizedResourceException;
use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Task\CreateTaskRequest;
use App\Http\Requests\v1\Task\UpdateTaskRequest;
use App\Http\Resources\v1\Task\TaskCollection;
use App\Http\Resources\v1\Task\TaskResource;
use App\Http\Traits\Pagination;
use App\Http\Traits\Sortable;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TaskController extends Controller
{

    use Pagination;
    use Sortable;

    public function index(Request $request): TaskCollection
    {
        $query = $this->aplySort(Task::query(), $request);
        return $this->pagination($query, $request, TaskCollection::class);
    }

    public function get($id) 
    {
        $task = Task::with(['status', 'user'])->find($id);
        if (!$task) {
            throw new NotFoundHttpException('Задача не найдена');
        }
        return response()->json(new TaskResource($task));
    }

    public function create(CreateTaskRequest $request): TaskResource 
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $task = Task::create($data);
        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task): TaskResource
    {
        $data = $request->validated();
        if (!Gate::allows('update', $task) && array_diff_key($data, array_flip(['status_id', 'id']))) {
            throw new UnauthorizedResourceException('Нет прав на обновление ресурса');
        }
        $task = Task::find($request->id);
        $task->update($data);
        return new TaskResource($task);
    }
}
