<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    protected $table = "contrato";
    public $timestamps = true;
    protected $fillable = [
        "id_contrato",
        "id_status",
        "id_locatario",
        "id_locador",
        "id_imovel",
        "id_tipo_contrato",
        "valor",
        "primeiro_vencimento",
        "dia_vencimento",
        "data_inicio",
        "data_fim",
        "inicio_estadia",
        "fim_estadia",
        "vigencia",
        "taxa_servico",
        "dias",
        "total",
        "sinal",
        "referencia",
        "observacoes",
        "renovou",
        "chave"
    ];
    //

    public function getAll() {

    }
}
