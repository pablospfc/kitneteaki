<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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

    public function salvar($data)
    {
        DB::transaction(function () use ($data) {
            $day = $this->extractDayFromDate($data);
            $data['dia_vencimento'] = $day;
            $id = self::create($data)->id;
            Imovel::setOcupado($data['id_imovel'], $data['id_tipo_contrato']);
            return $id;
        });
    }

    private function extractDayFromDate($data)
    {
        $timestamp = strtotime($data['primeiro_vencimento']);
        $day = date('d', $timestamp);
        return $day;
    }

    public function getAll()
    {
        return self::select(
            "imo.nome as imovel",
            "loc.nome as locatario",
            "con.dia_vencimento as dia_vencimento",
            "con.data_inicio as periodo_inicial",
            "con.data_fim as periodo_final",
            "sta.id as id_status",
            "sta.nome as status",
            "tco.nome as tipo_contrato",
            "con.id as id",
            "con.valor as valor",
            "con.vigencia",
            "con.taxa_servico",
            "con.total",
            "con.primeiro_vencimento"
        )
            ->from("contrato as con")
            ->join("status as sta", "con.id_status", "=", "sta.id")
            ->join("pessoa as loc", "con.id_locatario", "=", "loc.id")
            ->join("imovel as imo", "con.id_imovel", "=", "imo.id")
            ->join("tipo_contrato as tco", "con.id_tipo_contrato", "=", "tco.id")
            ->orderBy("loc.nome")
            ->get()
            ->toArray();
    }
}
