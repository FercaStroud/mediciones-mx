<?php

namespace App\Http\Controllers\Resources;

use App\Question;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Util\Utils;
use App\Traits\UploadTrait;
use Illuminate\Support\Str;

use Response;

class QuestionController extends Controller
{
    use UploadTrait;

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return Question::where("survey_id", "=", $request->get("survey_id"))
            ->orderBy('order', 'ASC')->get();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'input_type_id' => 'required',
            'survey_id' => 'required',
            'title' => 'required',
        ]);

        $question = new Question($request->all());
        $question->required = $request->get("required", 0);
        $question->src = null;

        if ($request->has('src') and $request->file('src') !== null) {
            $image = $request->file('src');
            $name = Str::slug($request->input('title')) . '_' . time();
            $folder = '/uploads/images/questions/';
            $filePath = $name . '.' . $image->getClientOriginalExtension();

            $this->uploadOne($image, $folder, 'public', $name);
            $question->src = $filePath;
        }

        $question->save();
        return response()->json($question, 201);
    }

    /**
     * @param Request $request
     * @param Question $question
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'input_type_id' => 'required',
            'title' => 'required',
            'order' => 'required',
        ]);

        $question->title = $request->get("title", $question->title);
        $question->order = $request->get("order", $question->order);
        $question->input_type_id = $request->get("input_type_id", $question->input_type_id);
        $question->required = $request->get("required", $question->required);

        if ($request->has('src') and $request->file('src') !== null) {
            $image = $request->file('src');
            $name = Str::slug($request->input('title')) . '_' . time();
            $folder = '/uploads/images/questions/';
            $filePath = $name . '.' . $image->getClientOriginalExtension();

            $this->uploadOne($image, $folder, 'public', $name);
            $question->src = $filePath;
        }

        $question->save();

        return response()->json($question, 201);
    }


    /**
     * @param Question $question
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Question $question)
    {
        $question->delete();

        return response()->json(null, 204);
    }

}
