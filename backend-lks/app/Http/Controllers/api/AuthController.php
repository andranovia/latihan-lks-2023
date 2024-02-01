<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Societies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


use function PHPUnit\Framework\isEmpty;

class AuthController extends Controller
{


    public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'id_card_number' => 'required',
        'password' => 'required',
    ]);

    $societyByIdCard = Societies::where('id_card_number', $request->id_card_number)->first();
    $societyByPassword = Societies::where('password', $request->password)->first();

    if ($societyByIdCard && $societyByPassword) {
        $success['token'] = $societyByIdCard->createToken('auth_token')->plainTextToken;
        $success['username'] = $societyByIdCard->name;
        $success['id_card'] = $societyByIdCard->id_card_number;

        return response()->json([
            'success' => true,
            'message' => 'Login sukses',
            'data' => $success,
        ]);
    } else {

        return response()->json([
            'success' => false,
            'message' => 'Cek user_id dan password lagi',
            'errors' => $validator->errors(),
        ]);
    }
}

    
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        
        $response = [
            'success'   => true,
            'message'   => 'Berhasil Logout'
        ];
        return response($response, 200);
    }
}
