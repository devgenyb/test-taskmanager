<?php

namespace Tests\Feature\v1;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class TaskTest extends TestCase
{

    use RefreshDatabase;
    
    private User $admin;
    private User $employer;
    private string $adminToken;
    private string $employerToken;


    protected function setUp(): void
    {
        parent::setUp();

        $this->artisan('migrate:fresh --seed');

        $this->admin = User::factory()->create([
            'email' => 'admin@testcase.com',
            'password' => Hash::make('password'),
            'role_id' => 1
        ]);
        $this->adminToken = $this->admin->createToken('AdminToken')->plainTextToken;

        $this->employer = User::factory()->create([
            'email' => 'employer@testcase.com',
            'password' => Hash::make('password'),
            'role_id' => 2
        ]);
        $this->employerToken = $this->employer->createToken('TestToken')->plainTextToken;
    }
    


    public function test_get_tasks_unauthenticated(): void
    {
        $response = $this->get('/api/v1/task');
        $response->assertStatus(401);
    }

    public function test_get_task_unauthenticated(): void
    {
        $response = $this->get('/api/v1/task/1');
        $response->assertStatus(401);
    }

    public function test_get_tasks_employer(): void
    {
        $response = $this->get('/api/v1/task', [
            'Authorization' => 'Bearer ' . $this->employerToken,
        ]);
        $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'description',
                    'status',
                    'user',
                    'done'
                ],
            ],
            'meta' => [
                'total',
                'current_page',
                'last_page'
            ]
        ])
        ->assertJsonCount(10, 'data');
    }

    public function test_task_not_found(): void
    {
        $response = $this->get('/api/v1/task/999999', [
            'Authorization' => 'Bearer ' . $this->employerToken,
        ]);
        $response->assertStatus(404);
    }

    public function test_get_tasks_employer_with_pagination(): void
    {
        $page = 2;
        $perPage = 15;

        $response = $this->get('/api/v1/task?page=' . $page . '&per_page=' . $perPage, [
            'Authorization' => 'Bearer ' . $this->employerToken,
        ]);
        $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'description',
                    'status',
                    'user',
                    'done'
                ],
            ],
            'meta' => [
                'total',
                'current_page',
                'last_page'
            ]
        ])
        ->assertJsonCount(15, 'data');

        $response->assertJsonFragment([
            'current_page' => $page,
            'per_page' => $perPage,
        ]);
    }

    public function test_update_admin_task(): void
    {

        $id = 1;
        $name = 'my test task';
        $description = 'test description';
        $done = true;
        $status_id = 2;
        
        $data = [
            'id' => $id,
            'name' => $name,
            'description' => $description,
            'status_id' => $status_id,
            'done' => $done,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->adminToken,
        ])->put('/api/v1/task', $data);
        $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => 1,
                'name' => $name,
                'description' => $description,
                'done' => $done,
                'status' => [
                    'id' => $status_id,
                    'name' => 'В разработке',
                ],
            ],
        ]);
    }

    public function test_update_employer_task(): void
    {

        $id = 1;
        $name = 'my test task';
        $description = 'test description';
        $done = true;
        $status_id = 3;
        
        $data = [
            'id' => $id,
            'name' => $name,
            'description' => $description,
            'status_id' => $status_id,
            'done' => $done,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->employerToken,
        ])->put('/api/v1/task', $data);
        $response->assertStatus(401);
    }

    public function test_update_status_employer_task(): void
    {

        $id = 1;
        $status_id = 3;
        
        $data = [
            'id' => $id,
            'status_id' => $status_id
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->employerToken,
        ])->put('/api/v1/task', $data);
        $response->assertStatus(200);
    }
}
