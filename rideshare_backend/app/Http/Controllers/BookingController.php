<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * this function returns all booking
     */
    public function bookings(Request $r){
        $bookings = Booking::all();
        return response()->json(['success' => $bookings]);
    }
}
