<?php

namespace App\Http\Controllers;

use App\Dao\UserService;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function logIn(Request $request)
    {
        $validatedData = $request->validate([
            'Email_User' => 'required|email',
            'Password_User' => 'required|string|min:6',
        ]);
    
        $email = $validatedData['Email_User'];
        $password = $validatedData['Password_User'];
    
        $user = $this->userService->login($email, $password);
    
        if ($user) {
            return response()->json(['message' => 'Login successful', 'user' => $user]);
        } else {
            return response()->json(['message' => 'Invalid informations'], 401);
        }
    }
    


    public function signIn(Request $request)
    {
        $data = [
            'FirstName_User' => $request->input('FirstName_User'),
            'LastName_User' => $request->input('LastName_User'),
            'Email_User' => $request->input('Email_User'),
            'Tel_User' => $request->input('Tel_User'),
            'Password_User' => $request->input('Password_User'),
            'Id_Role' => $request->input('Id_Role'),
        ];
        $user = $this->userService->createUser($data);

        if ($user) {
            return response()->json(['message' => 'Utilisateur créé avec succès', 'user' => $user], 201);
        } else {
            return response()->json(['message' => 'Échec de la création de du user'], 401);
        }
    }

    public function getAllusers()
    {
        $users = $this->userService->getAllusers();
        return response()->json($users);
    }
}
