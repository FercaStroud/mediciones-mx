<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Phone extends Model
{
    use SoftDeletes;
    protected $table = 'phones';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'contact_id',
        'name',
        'phone',
    ];

    protected $hidden = [
    ];

    public function contact()
    {
        return $this->belongsTo('App\Contact');
    }


}
