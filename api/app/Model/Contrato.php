<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Self_;

class Contrato extends Model
{
    protected $table = "contrato";
    protected $primaryKey = "id";
    public $timestamps = true;
    protected $fillable = [
        "id_contrato",
        "id_status",
        "id_locatario",
        "id_locador",
        "id_imovel",
        "id_tipo_contrato",
        "id_modelo_documento",
        "id_forma_pagamento",
        "valor",
        "primeiro_vencimento",
        "dia_vencimento",
        "data_inicio",
        "data_fim",
        "inicio_estadia",
        "fim_estadia",
        "vigencia",
        "dias",
        "valor_total",
        "referencia",
        "observacoes",
        "contrato",
        "renovou",
        "chave"
    ];

    public function salvar($data)
    {
        $insertId = DB::transaction(function () use ($data) {
            $day = $this->extractDayFromDate($data['primeiro_vencimento']);
            if ($data['id_tipo_contrato'] == 2) {
                $data['data_inicio'] = $data['inicio_estadia'];
                $data['data_fim'] = $data['fim_estadia'];
                unset($data['inicio_estadia']);
                unset($data['fim_estadia']);
            }
            $data['dia_vencimento'] = $day;
            $id = self::create($data)->id;
            Imovel::setOcupado($data['id_imovel'], $data['id_tipo_contrato']);
            return $id;
        });

        return $insertId;
    }

    public function renovarContrato($dados) {
        $insertId =  DB::transaction(function () use ($dados) {
            $day = $this->extractDayFromDate($dados['primeiro_vencimento']);
            self::where('id', $dados['id_contrato'])
                ->update(['renovou' => true, 'id_status' => 12]);

            $dados['dia_vencimento'] = $day;
            $id = self::create($dados)->id;

            return $id;
        });

        return $insertId;
    }

    public function remover($id) {
        DB::transaction(function() use ($id) {

            DocumentoContrato::where("id_contrato", $id)
                ->delete();
            ItemContrato::where("id_contrato", $id)
                ->delete();
            FiadorContrato::where("id_contrato", $id)
                ->delete();
            OcupantesImovel::where("id_contrato", $id)
                ->delete();
            TestemunhasContrato::where("id_contrato", $id)
                ->delete();

            ParcelaItem::join("parcela", "parcela_item.id_parcela", "=", "parcela.id")
                ->join("contrato", "parcela.id_contrato", "=", "contrato.id")
                ->where("contrato.id", $id)
                ->forceDelete();

            Imovel::join("contrato", "imovel.id", "=", "contrato.id_imovel")
                ->where("contrato.id", $id)
                ->update(['id_status' => 7]);

            Parcela::where("id_contrato", $id)
                ->delete();
            Contrato::destroy($id);
        });

    }

    private function extractDayFromDate($data)
    {
        $timestamp = strtotime($data);
        $day = date('d', $timestamp);
        return $day;
    }

    private function extractMonthFromDate($data)
    {
        $timestamp = strtotime($data);
        $month = date('m', $timestamp);
        return $month;
    }

    private function extractYearFromDate($data)
    {
        $timestamp = strtotime($data);
        $year = date('Y', $timestamp);
        return $year;
    }

    public function getAll($params)
    {
        $inquilino = false;
        $tipoContrato = false;
        $imovel = false;
        $vigencias = false;
        $valores = false;
        $status = false;

        if (isset($params['id_locatario']))
            $inquilino = true;
        if (isset($params['id_tipo_contrato']))
            $tipoContrato = true;
        if (isset($params['id_status']))
            $status = true;
        if(isset($params['vigencia_inicial']) && isset($params['vigencia_final']))
            $vigencias = true;
        if(isset($params['valor_inicial']) && isset($params['valor_final']))
            $valores = true;
        if (isset($params['id_imovel']))
            $imovel = true;

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
            "con.valor",
            "con.vigencia",
            "con.dias",
            "con.valor_total",
            "con.primeiro_vencimento"
        )
            ->from("contrato as con")
            ->join("status as sta", "con.id_status", "=", "sta.id")
            ->join("pessoa as loc", "con.id_locatario", "=", "loc.id")
            ->join("imovel as imo", "con.id_imovel", "=", "imo.id")
            ->join("tipo_contrato as tco", "con.id_tipo_contrato", "=", "tco.id")
            ->when($inquilino, function ($query) use ($params)  {
                return $query->where('con.id_locatario', $params['id_locatario']);
            })
            ->when($tipoContrato, function ($query) use ($params)  {
                return $query->where('con.id_tipo_contrato', $params['id_tipo_contrato']);
            })
            ->when($status, function ($query) use ($params)  {
                return $query->where('con.id_status', $params['id_status']);
            })
            ->when($vigencias, function ($query) use ($params) {
                return $query->whereRaw("(con.vigencia >= ? AND con.vigencia <= ?)",
                    [$params['vigencia_inicial'], $params['vigencia_final']]);
            })
            ->when($valores, function ($query) use ($params) {
                return $query->whereRaw("(con.valor >= ? AND con.valor <= ?)",
                    [$params['valor_inicial'], $params['valor_final']]);
            })
            ->when($imovel, function ($query) use ($params)  {
                return $query->where('con.id_imovel', $params['id_imovel']);
            })
            ->orderBy("loc.nome")
            ->get()
            ->toArray();
    }


}
