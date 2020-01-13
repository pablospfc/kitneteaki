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
            $day = $this->extractDayFromDate($data['primeiro_vencimento']);
            $data['dia_vencimento'] = $day;
            $id = self::create($data)->id;
            Imovel::setOcupado($data['id_imovel'], $data['id_tipo_contrato']);
            return $id;
        });
    }

    public function showParcelas() {

    }

    public function gerarParcelas($id)
    {
        $parcela = 1;
        $contrato = self::find($id);
        $vencimentos = $this->gerarVencimentos($contrato['primeiro_vencimento'], $contrato['vigencia']);
        $valorTotal = $this->getValorTotal($id, $contrato['valor']);
        $totalParcelas = count($vencimentos);
        foreach ($vencimentos as $vencimento) {
            $periodos = $this->gerarVencimentos($vencimento, 2);
            $parcelas[] = [
                'id_status'       => 4,
                'id_contrato'     => $id,
                'data_vencimento' => $vencimento,
                'valor'           => $valorTotal,
                'parcela'         => $parcela.'/'.$totalParcelas,
                'periodo_inicial' => $vencimento,
                'periodo_final'   => date('Y-m-d', strtotime($periodos[1]. ' -1 days'))
            ];
            $parcela++;
        }
        return Parcela::insert($parcelas);
    }

    private function getValorTotal($id, $valor)
    {
        $totalItens = DB::table('item_contrato')
            ->where("id_contrato", $id)
            ->sum('valor');

        $total = $totalItens + $valor;
        return $total;
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

    private function gerarVencimentos($data, $parcelas)
    {
// DATA PARA A PRIMEIRA PARCELA A PAGAR
/////////// ANO, MÊS, DIA
///
        $partes = explode("-", $data);
        $ano = $partes[0];
        $mes = $partes[1];
        $dia = $partes[2];
        $DP = Array($ano, $mes, $dia);
// ARRAY PARA AS DATAS
        $data_array = Array($DP[0], $DP[1], $DP[2]);
        $data_array2 = Array($DP[0], $DP[1], $DP[2]);
        $datas = [];
// ARMAZENANDO MÊS DA DATA MENOS 1
        $n = $data_array[1] - 1;
        $v_i = $n;
// FOR PRINCIPAL
        for ($i = 0; $i < $parcelas; $i++) {
            $v_i++;
// BASE PARA SOMAR OS MESES
            $v = strtotime('+' . $i . ' month', strtotime(implode("-", $data_array)));
            $v2 = strtotime('+' . $i . ' month', strtotime(implode("-", $data_array2)));
            $nd = date('Y-m-d', $v);
            $nd2 = date('Y-m-d', $v2);
// PEDAÇOS DA DATA DO LAÇO
            $p = explode("-", $nd);
// ATÉ 12 MÊSES
            if ($v_i <= 12) {
// BASE DO MÊS ATUAL
                $base_mes = date("Y-m-t", strtotime($nd));
// PEGANDO O ÚLTIMO DIA DO MÊS DO LAÇO
                $forma_data = $p[0] . '-' . $v_i . '-01';
                $ultimo_dia_do_mes = date("Y-m-t", strtotime($forma_data));
                $b1 = explode("-", $base_mes); // EXPLODE DO BASE MES
                $b2 = explode("-", $ultimo_dia_do_mes); // EXPLODE DO ULTIMO DIA DO MÊS
                if ($b1[2] != $b2[2]) {
                    $datas[] = "{$b2[0]}-{$b2[1]}-{$b2[2]}";
                } else {
                    $datas[] = "{$b1[0]}-{$b1[1]}-{$data_array[2]}";
                }
            }
// ATÉ 12 MÊSES
// DE 12 À 24 MESES
            elseif ($v_i > 12 && $v_i <= 24) {
// BASE DO MÊS ATUAL
                $base_mes = date("Y-m-t", strtotime($nd));
// PEGANDO O ÚLTIMO DIA DO MÊS DO LAÇO
                $forma_data = $p[0] . '-' . ($v_i - 12) . '-01';
                $ultimo_dia_do_mes = date("Y-m-t", strtotime($forma_data));
                $b1 = explode("-", $base_mes); // EXPLODE DO BASE MES
                $b2 = explode("-", $ultimo_dia_do_mes); // EXPLODE DO ULTIMO DIA DO MÊS
                if ($b1[2] != $b2[2]) {
                    $datas[] = "{$b2[0]}-{$b2[1]}-{$b2[2]}";
                } else {
                    $datas[] = "{$b1[0]}-{$b1[1]}-{$data_array[2]}";
                }
            }
// DE 12 À 24 MESES
// DE 24 À 36 MESES
            elseif ($v_i > 24 && $v_i <= 36) {
// BASE DO MÊS ATUAL
                $base_mes = date("Y-m-t", strtotime($nd));
// PEGANDO O ÚLTIMO DIA DO MÊS DO LAÇO
                $forma_data = $p[0] . '-' . ($v_i - 24) . '-01';
                $ultimo_dia_do_mes = date("Y-m-t", strtotime($forma_data));
                $b1 = explode("-", $base_mes); // EXPLODE DO BASE MES
                $b2 = explode("-", $ultimo_dia_do_mes); // EXPLODE DO ULTIMO DIA DO MÊS
                if ($b1[2] != $b2[2]) {
                    $datas[] = "{$b2[0]}-{$b2[1]}-{$b2[2]}";
                } else {
                    $datas[] = "{$b1[0]}-{$b1[1]}-{$data_array[2]}";
                }
            }
// DE 24 À 36 MESES
// DE 36 À 48 MESES
            elseif ($v_i > 36 && $v_i <= 48) {
// BASE DO MÊS ATUAL
                $base_mes = date("Y-m-t", strtotime($nd));
// PEGANDO O ÚLTIMO DIA DO MÊS DO LAÇO
                $forma_data = $p[0] . '-' . ($v_i - 36) . '-01';
                $ultimo_dia_do_mes = date("Y-m-t", strtotime($forma_data));
                $b1 = explode("-", $base_mes); // EXPLODE DO BASE MES
                $b2 = explode("-", $ultimo_dia_do_mes); // EXPLODE DO ULTIMO DIA DO MÊS
                if ($b1[2] != $b2[2]) {
                    $datas[] = "{$b2[0]}-{$b2[1]}-{$b2[2]}";
                } else {
                    $datas[] = "{$b1[0]}-{$b1[1]}-{$data_array[2]}";
                }
            }
// DE 36 À 48 MESES
// DE 48 À 60 MESES
            elseif ($v_i > 48 && $v_i <= 60) {
// BASE DO MÊS ATUAL
                $base_mes = date("Y-m-t", strtotime($nd));
// PEGANDO O ÚLTIMO DIA DO MÊS DO LAÇO
                $forma_data = $p[0] . '-' . ($v_i - 48) . '-01';
                $ultimo_dia_do_mes = date("Y-m-t", strtotime($forma_data));
                $b1 = explode("-", $base_mes); // EXPLODE DO BASE MES
                $b2 = explode("-", $ultimo_dia_do_mes); // EXPLODE DO ULTIMO DIA DO MÊS
                if ($b1[2] != $b2[2]) {
                    $datas[] = "{$b2[0]}-{$b2[1]}-{$b2[2]}";
                } else {
                    $datas[] = "{$b1[0]}-{$b1[1]}-{$data_array[2]}";
                }
            } // DE 48 À 60 MESES
            else {
            } // FIM DO ELSEIF
        } // FIM DO FOR PRINCIPAL
        return $datas;
    }
}
