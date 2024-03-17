<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * this function hadnles creating a new user in db
     */
    public function register(Request $r){
        // dd($r);
        User::create([
            'email' => $r->email,
            'username' => $r->username,
            'phone' => $r->phone,
            'password' => bcrypt($r->password),
            'birthday' => $r->birthday
        ]);
        return response()->json(['ok' => 'User registered successfully'], 200);
    }
}
