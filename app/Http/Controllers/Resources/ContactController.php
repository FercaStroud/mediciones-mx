<?php

namespace App\Http\Controllers\Resources;

use App\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Response;

class ContactController extends Controller
{

    public function index()
    {
        $contacts = Contact::with('addresses', 'phones', 'emails')->get();
        foreach ($contacts as $key=>$contact) {
            $contacts[$key]['count_addresses'] = $contact->addresses()->count();
            $contacts[$key]['count_phones'] = $contact->phones()->count();
            $contacts[$key]['count_emails'] = $contact->emails()->count();
        }
        return $contacts;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        $contact = new Contact($request->all());
        //$contact->user_id = $request->user()->id;
        $contact->save();
        return response()->json($contact, 201);
    }

    /**
     * @param Request $request
     * @param Contact $contact
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Contact $contact)
    {
        $request->validate([
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        return tap($contact)->update($request->all());
    }


    /**
     * @param Contact $contact
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json(null, 204);
    }

}
