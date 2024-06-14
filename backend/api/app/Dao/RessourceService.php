<?php

namespace App\Dao;

use App\Models\Ressource;

class RessourceService
{
    public function getAllRessourcesForListing()
    {
        return Ressource::where('State_Ressource', '!=', 'Pending')->get();
    }
    public function getAllRessourcesForApproving()
    {
        return Ressource::where('State_Ressource', '=', 'Pending')->get();
    }

    public function getAllRessources()
    {
        $ressources = Ressource::with('category', 'relationType')
            ->where('State_Ressource', 'Active')
            ->where('Public_Ressource', 1)
            ->get();

        $formattedRessources = [];

        foreach ($ressources as $ressource) {
            $formattedRessources[] = [
                'Id_Ressource' => $ressource->Id_Ressource,
                'Title_Ressource' => $ressource->Title_Ressource,
                'Description_Ressource' => $ressource->Description_Ressource,
                'Content_Ressource' => $ressource->Content_Ressource,
                'Type_Ressource' => $ressource->Type_Ressource,
                'State_Ressource' => $ressource->State_Ressource,
                'Public_Ressource' => $ressource->Public_Ressource,
                'created_at' => $ressource->created_at,
                'updated_at' => $ressource->updated_at,
                'category' => [
                    'id' => $ressource->category->id,
                    'Title_Category' => $ressource->category->Title_Category,
                    'created_at' => $ressource->category->created_at,
                    'updated_at' => $ressource->category->updated_at,
                ],
                'relation_type' => [
                    'id' => $ressource->relationType->id,
                    'Title_RelationType' => $ressource->relationType->Title_RelationType,
                    'created_at' => $ressource->relationType->created_at,
                    'updated_at' => $ressource->relationType->updated_at,
                ],
            ];
        }

        return $formattedRessources;
    }



    public function getRessourceById($id)
    {
        $ressource = Ressource::with('category', 'relationType')->where('Id_Ressource', $id)->first();

        if ($ressource && $ressource->category && $ressource->relationType) {
            return [
                'Id_Ressource' => $ressource->Id_Ressource,
                'Title_Ressource' => $ressource->Title_Ressource,
                'Description_Ressource' => $ressource->Description_Ressource,
                'Content_Ressource' => $ressource->Content_Ressource,
                'Type_Ressource' => $ressource->Type_Ressource,
                'State_Ressource' => $ressource->State_Ressource,
                'Public_Ressource' => $ressource->Public_Ressource,
                'created_at' => $ressource->created_at,
                'updated_at' => $ressource->updated_at,
                'category' => [
                    'id' => $ressource->category->id,
                    'Title_Category' => $ressource->category->Title_Category,
                    'created_at' => $ressource->category->created_at,
                    'updated_at' => $ressource->category->updated_at,
                ],
                'relation_type' => [
                    'id' => $ressource->relationType->id,
                    'Title_RelationType' => $ressource->relationType->Title_RelationType,
                    'created_at' => $ressource->relationType->created_at,
                    'updated_at' => $ressource->relationType->updated_at,
                ],
            ];
        }

        return null;
    }

    public function getAllRessourcesByUserId($userId)
    {
        $ressources = Ressource::with('category', 'relationType')
            ->where('Id_User', $userId)
            ->get();

        $formattedRessources = [];

        foreach ($ressources as $ressource) {
            $formattedRessources[] = [
                'Id_Ressource' => $ressource->Id_Ressource,
                'Title_Ressource' => $ressource->Title_Ressource,
                'Description_Ressource' => $ressource->Description_Ressource,
                'Content_Ressource' => $ressource->Content_Ressource,
                'Type_Ressource' => $ressource->Type_Ressource,
                'State_Ressource' => $ressource->State_Ressource,
                'Public_Ressource' => $ressource->Public_Ressource,
                'Id_User' => $ressource->Id_User,
                'created_at' => $ressource->created_at,
                'updated_at' => $ressource->updated_at,
                'category' => [
                    'id' => $ressource->category->id,
                    'Title_Category' => $ressource->category->Title_Category,
                    'created_at' => $ressource->category->created_at,
                    'updated_at' => $ressource->category->updated_at,
                ],
                'relation_type' => [
                    'id' => $ressource->relationType->id,
                    'Title_RelationType' => $ressource->relationType->Title_RelationType,
                    'created_at' => $ressource->relationType->created_at,
                    'updated_at' => $ressource->relationType->updated_at,
                ],
            ];
        }

        return $formattedRessources;
    }


    public function deleteRessource($id)
    {
        $ressource = Ressource::find($id);

        if ($ressource) {
            $ressource->delete();
            return true;
        }

        return false;
    }

    public function addRessource(array $data)
    {
        $ressource = new Ressource();
        $ressource->Title_Ressource = $data['Title_Ressource'];
        $ressource->Description_Ressource = $data['Description_Ressource'];
        $ressource->State_Ressource = $data['State_Ressource'];
        $ressource->Public_Ressource = $data['Public_Ressource'];
        $ressource->Content_Ressource = $data['Content_Ressource'];
        $ressource->Type_Ressource = $data['Type_Ressource'];
        $ressource->Id_Category = $data['Id_Category'];
        $ressource->Id_RelationType = $data['Id_RelationType'];
        $ressource->Id_User = $data['Id_User'];
        $ressource->save();

        return $ressource;
    }

    public function updateStatus(array $data)
    {
        $ressource = Ressource::find($data['Id_Ressource']);

        if ($ressource) {
            $ressource->update([
                'Title_Ressource' => $data['Title_Ressource'],
                'Description_Ressource' => $data['Description_Ressource'],
                'Public_Ressource' => $data['Public_Ressource'],
                'Content_Ressource' => $data['Content_Ressource'],
                'State_Ressource' => $data['State_Ressource'],
                'Type_Ressource' => $data['Type_Ressource'],
                'Id_Category' => $data['Id_Category'],
                'Id_RelationType' => $data['Id_RelationType'],
            ]);
            return $ressource;
        }
        return null;
    }

    public function updateRessource(array $data)
    {
        $ressource = Ressource::find($data['Id_Ressource']);

        if ($ressource) {
            $ressource->update([
                'Title_Ressource' => $data['Title_Ressource'],
                'Description_Ressource' => $data['Description_Ressource'],
                'Public_Ressource' => $data['Public_Ressource'],
                'Content_Ressource' => $data['Content_Ressource'],
                'State_Ressource' => $data['State_Ressource'],
                'Type_Ressource' => $data['Type_Ressource'],
                'Id_Category' => $data['Id_Category'],
                'Id_RelationType' => $data['Id_RelationType'],
            ]);
            return $ressource;
        }
        return null;
    }
}
