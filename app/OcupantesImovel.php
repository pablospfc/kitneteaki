<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OcupantesImovel extends Model
{
    //

    protected $table = "ocupante_imovel";
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
      "id",
      "id_contrato",
      "nome",
      "cpf_cnpj",
      "descricao"
    ];
}
