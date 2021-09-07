<?php

namespace App\Http\Controllers\Resources;

use App\Email;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Response;

class EmailsController extends Controller
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
            'email' => 'required',
        ]);

        if($request->get('primary')){
            Email::where('contact_id', '=', $request->get('contact_id'))->update(['primary' => 0]);
        }

        $email = new Email($request->all());
        $email->primary = (int)$request->get('primary');
        $email->save();
        return response()->json($email, 201);
    }

    /**
     * @param Request $request
     * @param Email $email
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Email $email)
    {
        $request->validate([
            'id' => 'required',
            'contact_id' => 'required',
            'email' => 'required',
        ]);

        if($request->get('primary')){
            Email::where('contact_id', '=', $request->get('contact_id'))->update(['primary' => 0]);
        }

        tap($email)->update($request->all());
        $email->primary = (int)$request->get('primary');

        $email->save();
        return response()->json($email, 201);
    }


    /**
     * @param Email $email
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Email $email)
    {
        $email->delete();

        return response()->json(null, 204);
    }

}
