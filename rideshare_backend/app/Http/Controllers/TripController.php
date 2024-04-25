<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;

class TripController extends Controller
{
    /**
     * Creates a new trip
     */
    public function newTrip(Request $request)
    {
        $validatedData = $request->validate([
            'departure' => 'required|string',
            'arrival' => 'required|string',
            'car' => 'required|string',
            'owner' => 'required|string',
            'price' => 'required|numeric',
            'places' => 'required|numeric',
            'date' => 'required|date',
        ]);
    
        $existingTrip = Trip::where('date', $validatedData['date'])->first();
        if ($existingTrip) {
            return response()->json(['error' => 'A trip already exists with the same date'], 400);
        }
    
        $user = $request->user();
        
        $trip = new Trip([
            'departure' => $validatedData['departure'],
            'arrival' => $validatedData['arrival'],
            'car' => $validatedData['car'],
            'price' => $validatedData['price'],
            'places' => $validatedData['places'],
            'date' => $validatedData['date'],
            'owner' => $user->username, 
        ]);
    
        $trip->save();
    
        return response()->json(['success' => 'Trip created successfully', 'trip' => $trip], 200);
    }

    /**
     * Retrieves all available trips and returns the data in the response
     */
    public function allTrips()
    {
        $trips = Trip::all();
        
        if ($trips->isEmpty()) {
            return response()->json(['message' => 'No trips found'], 404);
        }
        
        return response()->json(['trips' => $trips], 200);
    }

    /**
     * Retrieves all available trips and returns the data in the response
     */
    public function userDashboardData()
    {
        $trips = Trip::all();
        $bookings = Booking::all();

        $data = ["trips" => $trips, "bookings" => $bookings];
        if ($trips->isEmpty() || $bookings->isEmpty()) {
            return response()->json(['message' => 'No trips found'], 404);
        }
        
        return response()->json(['data' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function trip(Request $request, $id)
    {
        $trip = Trip::find($id);

        if (!$trip) {
            return response()->json(['error' => 'Trip not found'], 404);
        }

        return response()->json($trip);   
    }

    /**
     * Display the specified resource.
     */
    public function bookTrip(Request $r, $id){
        
        $user = $r->user();
        $trip = Trip::find($id);
        $user->reservations()->attach($trip->id, ["status" => "pending", "trip_owner" => $r->userId]);
        return response()->json(['success' => "WE WILL NOTIFY THE ORGANISER"], 200);
    }

    /**
     * this function uipdates a trip
     */
    public function updateTrip(Request $r){

        $trip = Trip::where('id', $r->id)->first();

        if(!$trip)
            return response()->json(["ERROR" => ["id" => $r->id]], 404);
        $trip->arrival = $r->arrival;
        $trip->departure = $r->departure;
        $trip->save();

        return response()->json(['success' => $trip], 200);
    }

    /**
     * this function accepts booking
     */
    public function acceptBooking(Request $r){
        $booking = Booking::findOrFail($r->bookingId);

        $booking->status = 'accepted';
        $booking->save();
    
        return response()->json(['response' => 'Booking request accepted successfully!']);
    }
}
