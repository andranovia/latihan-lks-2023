<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSocietyRequest;
use App\Http\Requests\UpdateSocietyRequest;
use App\Http\Resources\SocietyResource;
use App\Models\Societies;

class SocietyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Societies::get();

        return response()->json([
            // 'data' => $query,
            'data' => SocietyResource::collection($query),
            'message' => 'message recieved',
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSocietyRequest $request)
    {
        // $validate = Validator::make($request->all(), [
        //     'name' => 'required',
        // ]);

        $society = new Societies();
        // $society->id_card_number = $request->id_card_number;
        // $society->password = $request->password;
        // $society->name = $request->name;
        // $society->born_date = $request->born_date;
        // $society->gender = $request->gender;
        // $society->address = $request->address;
        // $society->regional_id = $request->regional_id;

        $society = Societies::create($request->all());
        $society->save();

        return response()->json([
            'success' => true,
            'message' => 'message sent'
        ], 201);
    }

    /**
     * Display the specified resource.
     */

    public function show(string $society)
    {
        // Societies::find();

        return response()->json([
            'data' => new SocietyResource($society),
            'message' => 'data finded'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSocietyRequest $request, Societies $society)
    {
        
        $society->id_card_number = $request->id_card_number;
        $society->password = $request->password;
        $society->name = $request->name;
        $society->born_date = $request->born_date;
        $society->gender = $request->gender;
        $society->address = $request->address;
        $society->regional_id = $request->regional_id;
        $society->save();

        return response()->json([
            'success' => true,
            'message' => 'data update'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(string $id)
    {

        Societies::destroy($id);

        return response()->json([
            'success' => true,
            'message' => 'data deleted'
        ], 200);
    }
}
