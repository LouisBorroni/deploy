<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'FirstName_User' => 'John',
            'LastName_User' => 'Doe',
            'Email_User' => 'johndoe@example.com',
            'Tel_User' => '1234567890',
            'Password_User' => Hash::make('password'), // Hash le mot de passe
            'Token_User' => hash('sha256', $this->generateToken()), // Génère un jeton aléatoire et le hache
            'Id_Role' => 3,
        ]);
    }

    private function generateToken()
    {
        return Str::random(60);
    }
}
