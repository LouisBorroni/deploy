<?php

namespace App\Http\Controllers;

use App\Dao\RoleService;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function getAllRoles()
    {
        $roles = $this->roleService->getAllRoles();
        return response()->json($roles);
    }

    public function updateRole(Request $request)
    {
        $request->validate([
            'Id_User'=> 'required|int',
            'Id_Role'=> 'required|int',
        ]);

        $role = $this->roleService->udpateRole($request->all());

        return response()->json($role, 201);
    }
}
