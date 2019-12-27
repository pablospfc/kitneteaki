<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class TestemunhasContrato extends Model
{
    protected $table = "testemunhas_contrato";
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "id",
        "id_contrato",
        "nome",
        "cpf",
    ];
}
