<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Survey extends Model
{
    use SoftDeletes;
    protected $table = 'surveys';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'welcome_text',
        'end_text',
        'anonymized',
        'active',
        'starts_at',
        'ends_at',
    ];

    protected $hidden = [
    ];

    public function questions()
    {
        return $this->hasMany('App\Question');
    }

}
