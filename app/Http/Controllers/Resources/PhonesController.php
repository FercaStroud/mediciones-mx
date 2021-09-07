<?php

namespace App\Http\Controllers\Resources;

use App\Phone;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Response;

class PhonesController extends Controller
{

    public function index(Request $request)
    {

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'contact_id' => 'required',
            'phone' => 'required',
        ]);

        if($request->get('primary')){
            Phone::where('contact_id', '=', $request->get('contact_id'))->update(['primary' => 0]);
        }

        $phone = new Phone($request->all());
        $phone->primary = (int)$request->get('primary');
        $phone->save();
        return response()->json($phone, 201);
    }

    /**
     * @param Request $request
     * @param Phone $phone
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Phone $phone)
    {
        $request->validate([
            'id' => 'required',
            'contact_id' => 'required',
            'phone' => 'required',
        ]);

        if($request->get('primary')){
            Phone::where('contact_id', '=', $request->get('contact_id'))->update(['primary' => 0]);
        }

        tap($phone)->update($request->all());
        $phone->primary = (int)$request->get('primary');

        $phone->save();
        return response()->json($phone, 201);
    }


    /**
     * @param Phone $phone
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Phone $phone)
    {
        $phone->delete();

        return response()->json(null, 204);
    }

}
