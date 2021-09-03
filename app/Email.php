<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Email extends Model
{
    use SoftDeletes;
    protected $table = 'emails';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'email',
        'contact_id',
    ];

    protected $hidden = [
    ];

    public function contact()
    {
        return $this->belongsTo('App\Contact');
    }
}
