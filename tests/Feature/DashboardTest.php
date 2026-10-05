<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users without cms permission return to the public homepage', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('home'));
});

test('administrators are redirected to the cms dashboard', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get(route('dashboard'))->assertRedirect(route('admin.dashboard'));
});
