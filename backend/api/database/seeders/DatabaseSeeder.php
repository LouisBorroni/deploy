<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\RelationType;
use Illuminate\Database\Seeder;
use Database\Seeders\RessourceTableSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\RoleSeeder;


class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(RelationTypeSeeder::class);
        $this->call(RessourceTableSeeder::class);
    }
}
