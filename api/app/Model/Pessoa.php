<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use mysql_xdevapi\Exception;
use phpDocumentor\Reflection\Types\Self_;

class Pessoa extends Model
{
    protected $table = "pessoa";
    protected $primaryKey = "id";
    public $incrementing = true;
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
        "cep",
        "logradouro",
        "bairro",
        "cidade",
        "estado",
        "numero",
        "complemento",
        "profissao"
    ];

    public function getAll(){
        return self::select(
            "pe.id",
            "pe.nome as nome",
            "pe.cpf_cnpj as cpf_cnpj",
            "pe.passaporte as passaporte",
            "pe.whatsapp as whatsapp",
            "pe.data_nascimento as data_nascimento",
            "cp.nome as categoria",
            "na.nome as nacionalidade",
            "tp.nome as tipo_pessoa"
        )
            ->from("pessoa as pe")
            ->join("nacionalidade as na", "pe.id_nacionalidade", "=", "na.id")
            ->join("categoria_pessoa as cp", "pe.id_categoria_pessoa", "=", "cp.id")
            ->leftJoin("tipo_pessoa as tp","pe.id_tipo_pessoa", "=", "tp.id")
            ->get()
            ->toArray();
    }
}
