<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $titleRole = ['User', 'Modérateur', 'Admninistrateur', 'SuperAdministrateur'];

        foreach ($titleRole as $title) {
            Role::create([
                'Title_Role' => $title,
            ]);
        }
    }
}
