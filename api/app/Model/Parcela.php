<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Parcela extends Model
{
    protected $table = "parcela";
    protected $primaryKey = "id";
    public $timestamps = true;
    protected $fillable = [
        "id_status",
        "id_tipo_pagamento",
        "id_contrato",
        "data_vencimento",
        "data_pagamento",
        "valor",
        "valor_pago",
        "periodo_inicial",
        "periodo_final",
    ];

    public function getByContrato($id) {
        return self::select(
            "pa.*",
            "st.nome as status"
        )
            ->from("parcela as pa")
            ->join("contrato as co", "pa.id_contrato", "=", "co.id")
            ->join("status as st", "pa.id_status", "=", "st.id")
            ->where("pa.id_contrato", $id)
            ->get()
            ->toArray();
    }

    public function getParcelas($idContrato) {
        $parcela = 1;
        $contrato = Contrato::find($idContrato);
        $vencimentos = $this->gerarVencimentos($contrato['primeiro_vencimento'], $contrato['vigencia']);
        $itens = (new ItemContrato())->getByContrato($idContrato);
        $valorTotal = $this->getValorTotal($idContrato, $contrato['valor']);
        $totalParcelas = count($vencimentos);

        foreach ($vencimentos as $vencimento) {
            $periodos = $this->gerarVencimentos($vencimento, 2);
            $parcelas[] = [
                'id_status'       => 4,
                'id_contrato'     => $idContrato,
                'data_vencimento' => $vencimento,
                'valor'           => $contrato['valor'],
                'valor_total'     => $valorTotal,
                'parcela'         => $parcela.'/'.$totalParcelas,
                'periodo_inicial' => $vencimento,
                'periodo_final'   => date('Y-m-d', strtotime($periodos[1]. ' -1 days')),
                'itens'           => $itens
            ];

            $parcela++;
        }

        return $parcelas;
    }

    public function gerarParcelas($id)
    {
        $parcela = 1;
        $contrato = Contrato::find($id);
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