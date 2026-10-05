<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CreateAdmin extends Command
{
    protected $signature = 'bakoel:admin {email : Email admin baru} {--name=Admin Bakoel Banjar}';

    protected $description = 'Membuat akun admin CMS dengan password acak yang aman';

    public function handle(): int
    {
        $email = Str::lower((string) $this->argument('email'));
        $name = (string) $this->option('name');
        $validator = Validator::make(['email' => $email, 'name' => $name], [
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            $this->error($validator->errors()->first());

            return self::FAILURE;
        }

        $password = Str::password(20);
        $user = new User(['name' => $name, 'email' => $email, 'password' => $password]);
        $user->is_admin = true;
        $user->email_verified_at = Carbon::now();
        $user->save();

        $this->info('Admin berhasil dibuat. Simpan password ini dan ubah setelah masuk.');
        $this->line('Email: '.$email);
        $this->line('Password: '.$password);

        return self::SUCCESS;
    }
}
