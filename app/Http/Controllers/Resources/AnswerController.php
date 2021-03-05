<?php

namespace App\Http\Controllers\Resources;

use App\Answer;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Util\Utils;
use App\Traits\UploadTrait;
use Illuminate\Support\Str;

use Response;

class AnswerController extends Controller
{
    use UploadTrait;

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return Answer::where("question_id", "=", $request->get("question_id"))
            ->orderBy('order', 'ASC')->get();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'question_id' => 'required',
            'title' => 'required',
            'value' => 'required',
        ]);

        $answer = new Answer($request->all());
        $answer->src = null;
        if (!$request->has('force_question_id')){
            $answer->force_question_id = null;
        }

        if ($request->has('src') and $request->file('src') !== null) {
            $image = $request->file('src');
            $name = Str::slug($request->input('title')) . '_' . time();
            $folder = '/uploads/images/answers/';
            $filePath = $name . '.' . $image->getClientOriginalExtension();

            $this->uploadOne($image, $folder, 'public', $name);
            $answer->src = $filePath;
        }

        $answer->end_survey = (int)$request->get('end_survey', 0);
        $answer->required = (int)$request->get('required', 0);
        $answer->save();

        return response()->json($answer, 201);
    }

    /**
     * @param Request $request
     * @param Answer $answer
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Answer $answer)
    {
        $request->validate([
            'question_id' => 'required',
            'title' => 'required',
            'value' => 'required',
        ]);

        $answer->title = $request->get("title", $answer->title);
        $answer->value = $request->get("value", $answer->value);
        $answer->order = $request->get("order", $answer->order);
        $answer->end_survey = $request->get("end_survey", $answer->end_survey);
        $answer->required = $request->get("required", $answer->required);
        $answer->force_question_id = $request->get("force_question_id", $answer->force_question_id);
        $answer->end_survey = (int)$request->get('end_survey', $answer->end_survey);
        $answer->required = (int)$request->get('required', $answer->required);

        if ($request->has('src') and $request->file('src') !== null) {
            $image = $request->file('src');
            $name = Str::slug($request->input('title')) . '_' . time();
            $folder = '/uploads/images/answers/';
            $filePath = $name . '.' . $image->getClientOriginalExtension();

            $this->uploadOne($image, $folder, 'public', $name);
            $answer->src = $filePath;
        }
        $answer->save();

        return response()->json($answer, 201);
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
