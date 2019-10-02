<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Imovel extends Model
{
    protected $table = "imovel";
    public $timestamps = true;
    protected $fillable = [
      "id_tipo_imovel",
      "nome",
      "logradouro",
      "numero",
      "cep",
      "complemento",
      "bairro",
      "cidade",
      "estado",
      "disponivel",
      "chave"
    ];
}
