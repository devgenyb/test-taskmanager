<?php

namespace Tests\Feature\v1;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // найти как правильно сидировать в тестах
        $this->artisan('migrate:fresh --seed');
    }

    /**
     * A basic feature test example.
     */
    public function test_user_can_get_token(): void
    {   

        $response = $this->postJson('/api/v1/login', [
            'email' => 'admin@admin.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token', 'id', 'email', 'roles' => ['id', 'name']]);
    }

    public function test_user_not_found(): void
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => 'adminnotfound@admin.com',
            'password' => 'password',
        ]);

        $response->assertStatus(404);
        $response->assertJson(['message' => "email не найден"]);
    }

    public function test_user_has_bad_password(): void
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => 'admin@admin.com',
            'password' => 'badpassword',
        ]);

        $response->assertStatus(422);
        $response->assertJson(['message' => "Неверный пароль"]);
    }
}
