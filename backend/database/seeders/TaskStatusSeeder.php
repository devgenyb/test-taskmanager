<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('task_statuses')->insert([
            [
                'name' => 'Создана'
            ],
            [
                'name' => 'В разработке'
            ],
            [
                'name' => 'Завершена'
            ],
        ]);
    }
}
