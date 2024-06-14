<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RelationTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RessourceController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Ressources

Route::get('/ressources', [RessourceController::class, 'getAllRessources']);
Route::get('/ressourcesForListing', [RessourceController::class, 'getAllRessourcesForListing']);
Route::get('/ressourcesForApproving', [RessourceController::class, 'getAllRessourcesForApproving']);
Route::get('/ressourceById/{id}', [RessourceController::class, 'getRessourceById']);
Route::post('/addRessource', [RessourceController::class, 'addRessource']);
route::post('/deleteRessource/{id}', [RessourceController::class, 'deleteRessource']);
route::patch('/updateRessource', [RessourceController::class, 'updateRessource']);
route::post('/updateStatus', [RessourceController::class, 'updateStatus']);
Route::get('/ressourcesByUserId/{id}', [RessourceController::class, 'getAllRessourcesByUserId']);


// User

Route::post('/logIn', [UserController::class, 'logIn']);
Route::post('/signIn', [UserController::class, 'signIn']);
Route::get('/users', [UserController::class, 'getAllUsers']);

// Category 

Route::get('/categories', [CategoryController::class, 'getAllCategories']);
Route::post('/addCategory', [CategoryController::class, 'addCategory']);
route::post('/deleteCategory/{id}', [CategoryController::class, 'deleteCategory']);

// RelationType

Route::get('/relationTypes', [RelationTypeController::class, 'getAllRelationTypes']);

// Role

Route::get('/roles', [RoleController::class, 'getAllRoles']);
Route::post('/updateRole', [RoleController::class, 'updateRole']);

// test

Route::get('/api', [ApiController::class, 'getJsonData']);