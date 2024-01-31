<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\RegionalController;
use App\Http\Controllers\api\SocietyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('v1')->group(function () {

    Route::resource('society', SocietyController::class);
    Route::get('/regionals', [RegionalController::class, 'get']);



    Route::prefix('auth')->group(function () {

        Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout'])->name('logout');
    });
});
