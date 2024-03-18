<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            'password' => Hash::make($r->password),
            'birthday' => $r->birthday
        ]);
        
        return response()->json(['ok' => 'User registered successfully'], 200);
    }

    /**
     * this is login function 
     */
    public function login(Request $r){
        $user = User::where('email', $r->email)->first();
        
        if(!$user || !Hash::check($r->password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid credentials'
                ], 401);
        }

        $data['token'] = $user->createToken($r->email)->plainTextToken;
        $data['user'] = $user;

        $response = [
            'status' => 'success',
            'message' => 'User is logged in successfully.',
            'data' => $data,
        ];

        return response()->json($response, 200);
    }
}
