<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RelationType;

class RelationTypeSeeder extends Seeder
{
    public function run()
    {
        $titleCategory = ['Soi', 'Conjoints', 'Famille: enfants / parents / fraterie', 'Professionnelle : collègues, collaborateurs et managers', 'Amis et communauté', 'Inconnus'];

        foreach ($titleCategory as $title) {
            RelationType::create([
                'Title_RelationType' => $title,
            ]);
        }
    }
}
