<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Dao\CategoryService;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function getAllcategories()
    {
        $categories = $this->categoryService->getAllcategories();
        return response()->json($categories);
    }

    public function addcategory(Request $request)
    {
        $request->validate([
            'Title_Category' => 'required|string',
        ]);

        $ressource = $this->categoryService->addcategory($request->all());

        return response()->json($ressource, 201);
    }

    public function deleteCategory($id)
    {
        $category = $this->categoryService->deleteCategory($id);

        if ($category) {
            return response()->json(['message' => 'categorie supprimée avec succès'], 200);
        } else {
            return response()->json(['message' => 'La categorie spécifiée n\'existe pas'], 404);
        }
    }
}
