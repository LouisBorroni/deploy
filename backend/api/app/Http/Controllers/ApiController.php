<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApiController extends Controller
{
    public function getJsonData()
    {
        // Lire le contenu du fichier JSON
        $json = Storage::disk('public')->get('myfile.json');

        // Décoder le JSON en un tableau associatif
        $data = json_decode($json, true);

        // Retourner les données JSON
        return response()->json($data);
    }
}

?>