<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes;
    protected $table = 'contacts';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'second_last_name',
    ];

    protected $hidden = [
    ];

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }
    public function phones()
    {
        return $this->hasMany('App\Phone');
    }
    public function emails()
    {
        return $this->hasMany('App\Email');
    }
}
