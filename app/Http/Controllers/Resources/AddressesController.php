<?php

namespace App\Http\Controllers\Resources;

use App\Address;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Response;

class AddressesController extends Controller
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
            'street_name' => 'required',
            'street_number' => 'required',
        ]);

        if($request->get('primary')){
            Address::where('contact_id', '=', $request->get('contact_id'))->update(['primary' => 0]);
        }

        $address = new Address($request->all());
        $address->primary = (int)$request->get('primary');
        $address->save();
        return response()->json($address, 201);
    }

    /**
     * @param Request $request
     * @param Address $address
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Address $address)
    {
        $request->validate([
            'id' => 'required',
            'contact_id' => 'required',
            'street_name' => 'required',
            'street_number' => 'required',
        ]);

        if($request->get('primary')){
            Address::where('contact_id', '=', $request->get('contact_id'))->update(['primary' => 0]);
        }

        tap($address)->update($request->all());
        $address->primary = (int)$request->get('primary');

        $address->save();
        return response()->json($address, 201);
    }


    /**
     * @param Address $address
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Address $address)
    {
        $address->delete();

        return response()->json(null, 204);
    }

}
