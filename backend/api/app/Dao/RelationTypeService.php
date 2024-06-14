<?php

namespace App\Dao;

use App\Models\RelationType;

class RelationTypeService
{
    public function getAllRelationTypes()
    {
        $relationTypes = RelationType::All();
        $formatedRelationTypes = [];

        foreach ($relationTypes as $relationType) {
            $formatedRelationTypes[] = [
                'Id_RelationType' => $relationType->id,
                'Title_RelationType' => $relationType->Title_RelationType,
            ];
        }
        return $formatedRelationTypes;    
    }
}
