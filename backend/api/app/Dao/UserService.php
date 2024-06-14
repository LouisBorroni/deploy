<?php

namespace App\Dao;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function login($email, $password)
    {
        // Récupérez l'utilisateur par e-mail
        $user = User::where('Email_User', $email)->first();

        // Vérifie si l'utilisateur existe et si le mot de passe haché correspond au mot de passe stocké
        if ($user && Hash::check($password, $user->Password_User)) {
            $token = $this->generateToken(); // Générer un jeton d'authentification
            $user->Token_User = hash('sha256', $token);
            $user->save();

            return [
                'user' => $this->removePasswordField($user),
            ];
        }

        return null;
    }

    public function createUser(array $userData)
    {
        $userData['Password_User'] = Hash::make($userData['Password_User']);
        $userData['Token_User'] = hash('sha256', $this->generateToken());
        $user = User::create($userData);

        return $this->removePasswordField($user);
    }

    private function removePasswordField($user)
    {
        $userArray = $user->toArray();
        unset($userArray['Password_User'], $userArray['created_at'], $userArray['updated_at']);

        return $userArray;
    }

    public function getAllUsers()
    {
        $users = User::with('role')->get();

        $formattedUsers = [];

        foreach ($users as $user){
            $formattedUsers[] = [
                'Id_User' => $user->Id_User,
                'FirstName_User' => $user->FirstName_User,
                'LastName_User' => $user->LastName_User,
                'Email_User' => $user->Email_User,
                'Tel_User' => $user->Tel_User,
                'role' => [
                    'id' => $user->role->id,
                    'Title_Role' => $user->role->Title_Role,
                ]
            ];
        }   
        return $formattedUsers;    
    }

    private function generateToken()
    {
        return Str::random(60);
    }
}
