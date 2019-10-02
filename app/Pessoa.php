<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use mysql_xdevapi\Exception;

class Pessoa extends Model
{
    protected $table = "pessoa";
    public $timestamps = true;
    protected $fillable = [
        "id_estado_civil",
        "id_tipo_pessoa",
        "nome",
        "cpf",
        "rg",
        "endereco",
        "data_nascimento",
        "orgao_expedidor",
        "uf_expedidor",
        "profissao",
        "naturalidade",
        "bairro",
        "cep",
        "email",
        "disponivel"
    ];
}
