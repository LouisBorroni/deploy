<?php
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\RessourcesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/home', function(){
    return view('home');
});

Route::get('/ressources', [RessourceController::class, 'getAllRessources']);



/* * *********************************************************************** */
/* * ******  Authentification ********************************************** */
/* * *********************************************************************** */

//Route::get('getLogin', function(){
//    return view ('authentification/formLogin');
//});

Route::post('/logIn', [UserController::class, 'logIn']);
Route::post('/signIn', [UserController::class, 'signIn']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/api', [ApiController::class, 'getJsonData']);