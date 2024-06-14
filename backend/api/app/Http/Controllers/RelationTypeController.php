<?php

namespace App\Http\Controllers;

use App\Dao\RelationTypeService;

class RelationTypeController extends Controller
{
    protected $relationTypeService;

    public function __construct(RelationTypeService $relationTypeService)
    {
        $this->relationTypeService = $relationTypeService;
    }

    public function getAllRelationTypes()
    {
        $relationTypes = $this->relationTypeService->getAllRelationTypes();
        return response()->json($relationTypes);
    }
}
