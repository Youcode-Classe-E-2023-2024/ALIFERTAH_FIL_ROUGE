<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    /**
     * Creates a new trip.
     */
    public function newTrip(Request $request)
    {
        $validatedData = $request->validate([
            'departure' => 'required|string',
            'arrival' => 'required|string',
            'car' => 'required|string',
            'price' => 'required|numeric',
            'date' => 'required|date',
        ]);
    
        $existingTrip = Trip::where('date', $validatedData['date'])->first();
        if ($existingTrip) {
            return response()->json(['error' => 'A trip already exists with the same date'], 400);
        }
    
        $trip = Trip::create($validatedData);
    
        return response()->json(['success' => 'Trip created successfully', 'trip' => $trip], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trip $trip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trip $trip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip)
    {
        //
    }
}
