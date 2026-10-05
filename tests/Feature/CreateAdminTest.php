<?php

use App\Models\User;

test('admin command creates a verified administrator without a fixed password', function () {
    $this->artisan('bakoel:admin', ['email' => 'admin@example.com'])
        ->expectsOutputToContain('Admin berhasil dibuat.')
        ->assertSuccessful();

    $this->assertDatabaseHas('users', ['email' => 'admin@example.com', 'is_admin' => true]);
    expect(User::query()->firstOrFail()->email_verified_at)->not->toBeNull();
});

test('admin command does not promote or overwrite an existing user', function () {
    $user = User::factory()->create(['email' => 'existing@example.com']);

    $this->artisan('bakoel:admin', ['email' => $user->email])->assertFailed();

    $this->assertDatabaseCount('users', 1);
    $this->assertDatabaseHas('users', ['id' => $user->id, 'is_admin' => false, 'password' => $user->password]);
});
