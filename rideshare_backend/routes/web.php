<?php

use App\Http\Controllers\TripController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Route::post('/register', [UserController::class , "register"])->name("register");
Route::post('/login', [UserController::class , "login"])->name("login"); 
// Route::post('/logout', [UserController::class , "logout"])->name("logout");

Route::post('/logout', [UserController::class, "logout"])
    ->name("logout")
    ->middleware('auth:sanctum');

Route::post('/newTrip', [TripController::class, "newTrip"])
->name("newTrip")
->middleware('auth:sanctum');

Route::get('/allTrips', [TripController::class, "allTrips"])
->name("allTrips")
->middleware('auth:sanctum');

Route::get('/trip/{id}', [TripController::class, "trip"])
->name("trip");

Route::post('/book/{id}', [TripController::class, "bookTrip"])
->name("bookTrip")
->middleware('auth:sanctum');

Route::get('/allUsers', [UserController::class, "allUsers"])
->name("allUsers")
->middleware('auth:sanctum');


