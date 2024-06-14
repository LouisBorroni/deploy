<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Dao\RessourceService;

class RessourceController extends Controller
{
    protected $ressourceService;

    public function __construct(RessourceService $ressourceService)
    {
        $this->ressourceService = $ressourceService;
    }



    public function getAllRessources()
    {
        $ressources = $this->ressourceService->getAllRessources();
        return response()->json($ressources);
    }

    public function getAllRessourcesForListing()
    {
        $ressources = $this->ressourceService->getAllRessourcesForListing();
        return response()->json($ressources);
    }

    public function getAllRessourcesForApproving()
    {
        $ressources = $this->ressourceService->getAllRessourcesForApproving();
        return response()->json($ressources);
    }

    public function deleteRessource($id)
    {
        $ressource = $this->ressourceService->deleteRessource($id);

        if ($ressource) {
            return response()->json(['message' => 'Ressource supprimée avec succès'], 200);
        } else {
            return response()->json(['message' => 'La ressource spécifiée n\'existe pas'], 404);
        }
    }

    public function getRessourceById($id)
    {
        $ressource = $this->ressourceService->getRessourceById($id);
        return response()->json($ressource);
    }

    public function getAllRessourcesByUserId($id)
    {
        $ressource = $this->ressourceService->getAllRessourcesByUserId($id);
        return response()->json($ressource);
    }

    public function addRessource(Request $request)
    {
        $request->validate([
            'Title_Ressource' => 'required|string',
            'Description_Ressource' => 'required|string',
            'State_Ressource' => 'required|string',
            'Public_Ressource' => 'required|boolean',
            'Content_Ressource' => 'required|string',
            'Type_Ressource' => 'required|string',
            'Id_Category' => 'required|int',
            'Id_RelationType' => 'required|int',
            'Id_User' => 'required|int',
        ]);

        $ressource = $this->ressourceService->addRessource($request->all());

        return response()->json($ressource, 201);
    }

    public function updateStatus(Request $request)
    {
        $request->validate([
            'Id_Ressource' => 'required|int',
            'Title_Ressource' => 'string',
            'Description_Ressource' => 'string',
            'State_Ressource' => 'string',
            'Public_Ressource' => 'boolean',
            'Content_Ressource' => 'string',
            'Type_Ressource' => 'string',
            'Id_Category' => 'int',
            'Id_RelationType' => 'int',
            'Id_User' => 'int',
        ]);

        $ressource = $this->ressourceService->updateStatus($request->all());

        return response()->json($ressource, 201);
    }

    public function updateRessource(Request $request)
    {
        $request->validate([
            'Id_Ressource' => 'required|int',
            'Title_Ressource' => 'string',
            'Description_Ressource' => 'string',
            'State_Ressource' => 'string',
            'Public_Ressource' => 'boolean',
            'Content_Ressource' => 'string',
            'Type_Ressource' => 'string',
            'Id_Category' => 'int',
            'Id_RelationType' => 'int',

        ]);

        $ressource = $this->ressourceService->updateRessource($request->all());

        if ($ressource) {
            return response()->json($ressource, 200);
        } else {
            return response()->json(['message' => 'La ressource spécifiée n\'existe pas'], 404);
        }
    }

}
