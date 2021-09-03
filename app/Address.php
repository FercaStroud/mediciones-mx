<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;
    protected $table = 'addresses';
    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'contact_id',
        'street_name',
        'street_number',
        'street_number_int',
        'country',
        'state',
        'city',
        'zipcode',
        'other_details',
    ];

    protected $hidden = [
    ];

    public function contact()
    {
        return $this->belongsTo('App\Contact');
    }
}
