<?php

namespace App\Http\Controllers\Resources;

use App\Question;
use App\Survey;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Util\Utils;
use Illuminate\Support\Str;
use Response;

class SurveyController extends Controller
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return Survey::where("user_id", "=", $request->get("user_id"))
            ->orderBy('id', 'ASC')->get();
    }

    public function getBySlug(Request $request, $slug)
    {
        $survey = Survey::where('slug', '=', $slug)->get();
        $survey[0]['questions'] = Survey::find($survey[0]['id'])->questions;

        foreach ($survey[0]['questions'] as $key => $question){
            $survey[0]['questions'][$key]['answers'] = Question::find($question['id'])->answers;
        }

        return response()->json($survey, 201);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'slug' => 'required',
        ]);

        $survey = new Survey($request->all());
        $survey->user_id = $request->user()->id;

        $survey->save();
        return response()->json($survey, 201);
    }

    /**
     * @param Request $request
     * @param Survey $survey
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Survey $survey)
    {
        $request->validate([
            'title' => 'required',
            'slug' => 'required',
        ]);

        return tap($survey)->update($request->all());
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request)
    {
        $request->delete();

        return response()->json(null, 204);
    }

}
