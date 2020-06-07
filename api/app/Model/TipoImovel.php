<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class TipoImovel extends Model
{
    protected $table = "tipo_imovel";
    protected $primaryKey = "id";
    public $timestamps = true;
    protected $fillable = [
        "nome"
    ];

}
