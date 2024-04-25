<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{

    /**
     * this function returns all users registerd 
     */
    public function allUsers(Request $request){
        $users = User::all();
        
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No Users found'], 404);
        }
        
        return response()->json(['users' => $users], 200);
    }
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

    /**
     * this functrion handles the logout process
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $accessToken = $user->currentAccessToken();
    
            if ($accessToken instanceof PersonalAccessToken) {
                $accessToken->delete(); 
            } else {
                return response()->json(['error' => 'No valid access token found'], 400);
            }
    
            return response()->json(['message' => 'Logged out successfully'], 200);
        } else {
            return response()->json(['error' => 'User is not authenticated'], 401);
        }
    }
    /**
     * this function upadtes  a user's infos
     */

    public function updateUser(Request $r){
        $user = User::where('id', $r->id)->first();

        if(!$user)
            return response()->json(["ERROR" => "User not found"], 404);

        $user->role = $r->role;
        $user->email = $r->email;
        $user->username = $r->username;
        $user->save();
        return response()->json(["sucess" => $user], 200);

    }

    /**
     * this function deletes a user based on its id
     */
    public function deleteUser(Request $r, $id){
        $user = User::find($id);
        if(!$user)
            return response()->json(["error : " => "user not found"], 404);
        $user->delete();
        return response()->json(["success : " => "user deleted!!"], 200);
        
    } 
    
    /**
     * this function returns the information of a single user based on its id
     */
    public function userInfo(Request $r, $id){
        $user = User::find($id);
        return response($user);
    }
}
