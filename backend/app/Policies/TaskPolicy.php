<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{


        /**
     * Определяет имеет ли пользователь разрешения полностью обновлять задачу
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Task  $task
     * @return bool
     */

     public function update(User $user, Task $task)
     {
        return $user->hasRole('admin');
     }
}
