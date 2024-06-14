<?php

namespace App\Dao;

use App\Models\Role;
use App\Models\User;

class RoleService
{
    public function getAllRoles()
    {
        $roles = Role::All();
        $formatedRoles = [];

        foreach ($roles as $role) {
            $formatedRoles[] = [
                'Id_Role' => $role->id,
                'Title_Role' => $role->Title_Role,
            ];
        }
        return $formatedRoles;    
    }

    public function udpateRole(array $data)
    {
        $user = User::find($data['Id_User']);

        if ($user) {
            $user->update([
                'Id_User' => $data['Id_User'],
                'Id_Role' => $data['Id_Role'],
            ]);
        }
        return $user;    
    }


}
