<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Regional;
use Illuminate\Http\Request;

class RegionalController extends Controller
{
    public function get()
    {
        $query = Regional::get();

        return response()->json([
            'data' => $query,
            'message' => 'get data success',
        ], 200);
    }
}
