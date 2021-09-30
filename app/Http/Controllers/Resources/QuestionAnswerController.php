<?php

namespace App\Http\Controllers\Resources;

use App\QuestionAnswer;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

use Response;

class QuestionAnswerController extends Controller
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return QuestionAnswer::where("survey_id", "=", $request->get("survey_id"))->get();
    }

}
