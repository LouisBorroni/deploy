<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $titleCategory = ['Communication', 'Cultures', 'Développement personnel', 'Intelligence émotionnelle', 'Loisirs', 'Monde professionnel', 'Parentalité', 'Qualité de vie', 'Recherche de sens', 'Santé physique', 'Santé psychiatrique', 'Spiritualité', 'Vie affective'];

        foreach ($titleCategory as $title) {
            Category::create([
                'Title_Category' => $title,
            ]);
        }
    }
}
