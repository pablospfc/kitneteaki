<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\Self_;

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

    public function salvar($data) {
        $day = $this->extractDayFromDate($data);
        $data['dia_vencimento'] = $day;
        $id = self::create($data)->id;
        error_log($id);
        return $id;
    }

    private function extractDayFromDate($data) {
        $timestamp = strtotime($data['primeiro_vencimento']);
        $day = date('d', $timestamp);
        return $day;
    }

    public function getAll() {
        return self::select(
            "imo.nome as imovel",
            "loc.nome as locatario",
            "con.dia_vencimento as dia_vencimento",
            "con.data_inicio",
            "con.data_fim",
            "sta.nome as status",
            "tco.nome as tipo_contrato",
            "con.valor as valor",
            "con.vigencia",
            "con.taxa_servico",
            "con.total",
            "con"
        )
            ->from("imovel as imo")
            ->join("tipo_imovel as tip","imo.id_tipo_imovel","=","tip.id")
            ->join("transacao_imovel as tra","imo.id_transacao_imovel", "=", "tra.id")
            ->join("status as sta", "imo.id_status", "=", "sta.id")
            ->orderBy("imo.nome")
            ->get()
            ->toArray();
    }
}
