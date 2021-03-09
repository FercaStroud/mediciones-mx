<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Answer extends Model
{
    use SoftDeletes;
    protected $table = 'answers';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'question_id',
        'title',
        'value',
        'src',
        'order',
        'end_survey',
        'force_question_id',
    ];

    protected $hidden = [
    ];


    public function question()
    {
        return $this->belongsTo('App\Question');
    }
}
