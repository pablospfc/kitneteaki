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
        "id_genero",
        "id_categoria_pessoa",
        "id_nacionalidade",
        "nome",
        "cpf_cnpj",
        "rg",
        "passaporte",
        "data_nascimento",
        "orgao_expedidor",
        "data_emissao",
        "email",
        "telefone_celular",
        "whatsapp",
        "profissao"
    ];
}
