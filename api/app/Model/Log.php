<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = "log";
    public $timestamps = true;
    protected $fillable = [
        "message"
    ];
}
