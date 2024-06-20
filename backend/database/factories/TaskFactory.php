<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\TaskStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{

    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = TaskStatus::pluck('id')->toArray();
        $users = User::pluck('id')->toArray();
        // не могу вынести их в конструктор, нужно найти нормальное решение

        return [
            "name" => fake()->title(),
            "done" => fake()->boolean(),
            "description" => fake()->text(),
            "status_id" => fake()->randomElement($statuses),
            "user_id" => fake()->randomElement($users)
        ];
    }
}
