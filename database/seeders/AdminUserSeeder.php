<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = [
            'name' => 'Admin Bakoel Banjar',
            'email' => 'admin@example.com',
            'password' => 'password',
        ];

        $user = User::query()->firstOrCreate(
            ['email' => $admin['email']],
            [...$admin, 'is_admin' => true, 'email_verified_at' => Carbon::now()],
        );

        if (! $user->is_admin) {
            throw new RuntimeException('Email admin sudah digunakan akun non-admin. Ubah email di AdminUserSeeder.');
        }

        if ($user->wasRecentlyCreated) {
            $this->command->info('Admin CMS: '.$admin['email']);
            $this->command->line('Password awal: '.$admin['password']);
        }
    }
}
