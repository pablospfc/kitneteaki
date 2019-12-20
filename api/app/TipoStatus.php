<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoStatus extends Model
{
    protected $table = "tipo_status";
    public $timestamps = true;
    protected $fillable = [
      "nome"
    ];
}
