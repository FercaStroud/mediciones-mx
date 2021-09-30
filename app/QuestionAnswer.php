<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionAnswer extends Model
{
    protected $table = 'question_answer';
    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'survey_id',
        'question_answer_details_id',
        'question',
        'answer',
    ];

    protected $hidden = [
    ];

}
