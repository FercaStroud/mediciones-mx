<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;
    protected $table = 'questions';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'input_type_id',
        'survey_id',
        'title',
        'src',
        'required',
        'order',
    ];

    protected $hidden = [
    ];


    public function answers()
    {
        return $this->hasMany('App\Answer');
    }

    public function survey()
    {
        return $this->belongsTo('App\Survey');
    }

}
