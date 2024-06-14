<?php

namespace App\Dao;

use App\Models\Category;

class CategoryService
{
    public function getAllcategories()
    {
        $categories = Category::All();
        $formatedcategories = [];

        foreach ($categories as $category) {
            $formatedcategories[] = [
                'Id_Category' => $category->id,
                'Title_Category' => $category->Title_Category,
            ];
        }
        return $formatedcategories;
    }

    public function addCategory(array $data)
    {
        $category = new Category();
        $category->Title_Category = $data['Title_Category'];
        $category->save();

        return $category;
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            return true; 
        }
        return false;
    }
}
