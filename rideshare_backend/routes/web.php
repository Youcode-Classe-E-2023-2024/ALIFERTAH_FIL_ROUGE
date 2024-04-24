<?php

use App\Http\Controllers\BookingController;
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

Route::post('/updateUser', [UserController::class, "updateUser"])
->name("updateUser")
->middleware('auth:sanctum');

Route::post('/updateTrip', [TripController::class, "updateTrip"])
->name("updateTrip")
->middleware('auth:sanctum');

Route::get('/bookings', [BookingController::class, "bookings"])
->name("bookings")
->middleware('auth:sanctum');

Route::delete('/deleteUser/{id}', [UserController::class, "deleteUser"])
->name("deleteUser")
->middleware('auth:sanctum');

Route::get('/userDashboardData', [TripController::class, "userDashboardData"])
->name("userDashboardData")
->middleware('auth:sanctum');

Route::post('/acceptBooking', [TripController::class, "acceptBooking"])
->name("acceptBooking")
->middleware('auth:sanctum');


