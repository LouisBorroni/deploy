<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Ressource;
use App\Models\RelationType;
use Illuminate\Database\Eloquent\Factories\Factory;

class RessourceFactory extends Factory
{
    protected $model = Ressource::class;

    public function definition()
    {
        $stateOptions = ['Active', 'Pending', 'Inactive'];
        $contentRessources = ['Je suis un articel', 'Je suis un jeux', 'https://www.youtube.com/watch?v=Zv1QV6lrc_Y'];
        $typeRessources = ['article', 'vidéo', 'défi/jeux'];
        $categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        $relationTypes = [1, 2, 3, 4, 5, 6];

        return [
            'Title_Ressource' => $this->faker->sentence,
            'Description_Ressource' => $this->faker->paragraph,
            'State_Ressource' => $this->faker->randomElement($stateOptions),
            'Public_Ressource' => $this->faker->boolean,
            'Content_Ressource' => $this->faker->randomElement($contentRessources),
            'Type_Ressource' => $this->faker->randomElement($typeRessources),
            'Id_Category' => $this->faker->randomElement($categories),
            'Id_RelationType' => $this->faker->randomElement($relationTypes),
            'Id_User' => 1,
        ];
    }
}
