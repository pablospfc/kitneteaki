<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Imovel extends Model
{
    protected $table = "imovel";
    public $timestamps = true;
    protected $fillable = [
      "id_tipo_imovel",
      "id_status",
      "id_transacao_imovel",
      "nome",
      "logradouro",
      "condominio",
      "apartamento",
      "latitude",
      "longitude",
      "ponto_referencia",
      "bloco",
      "valor_iptu",
      "valor_condominio",
      "valor_imovel",
      "numero",
      "cep",
      "complemento",
      "bairro",
      "cidade",
      "estado",
      "chave"
    ];

    public function getAll() {
        return self::select(
          "imo.nome as nome",
          "sta.nome as status",
          "tip.nome as tipo_imovel",
          "tra.nome as transacao_imovel",
          "imo.valor as valor_imovel"
        )
            ->from("imovel as imo")
            ->join("tipo_imovel as tip","imo.id_tipo_imovel","=","tip.id")
            ->join("transacao_imovel as tra","imo.id_transacao_imovel", "=", "tra.id")
            ->join("status as sta", "imo.id_status_imovel", "=", "sta.id")
            ->get()
            ->toArray();
    }
}
