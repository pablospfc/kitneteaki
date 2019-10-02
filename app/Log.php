<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = "pessoa";
    public $timestamps = true;
    protected $fillable = [
        "message"
    ];
}
