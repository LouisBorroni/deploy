<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ressource;


class RessourceTableSeeder extends Seeder
{
    public function run()
    {
        Ressource::factory(10)->create();
    }
}
