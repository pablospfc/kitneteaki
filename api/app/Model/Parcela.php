<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Self_;

class Parcela extends Model
{
    protected $table = "parcela";
    protected $primaryKey = "id";
    public $timestamps = true;
    private $user;
    protected $fillable = [
        "id_status",
        "id_forma_pagamento",
        "id_contrato",
        "data_vencimento",
        "data_pagamento",
        "valor",
        "parcela",
        "competencia",
        "valor_pago",
        "periodo_inicial",
        "periodo_final",
    ];

    public function __construct(array $attributes = [])
    {
        $this->user = auth('api')->user();
        parent::__construct($attributes);
    }

    public function listParcelas($params)
    {

        $imovel = false;
        $locatario = false;
        $tipoContrato = false;
        $formaPagamento = false;
        $status = false;
        $periodos = false;

        if (isset($params['id_imovel']))
            $imovel = true;
        if (isset($params['id_locatario']))
            $locatario = true;
        if (isset($params['id_tipo_contrato']))
            $tipoContrato = true;
        if (isset($params['id_forma_pagamento']))
            $formaPagamento = true;
        if (isset($params['id_status']))
            $status = true;
        if (isset($params['periodo_inicial']) && isset($params['periodo_final']))
            $periodos = true;


        return self::select(
            "pa.*",
            "pe.nome as inquilino",
            "fp.nome as forma_pagamento",
            "st.nome as status",
            "im.nome as imovel"
        )
            ->from("parcela as pa")
            ->join("contrato as co", "pa.id_contrato", "=", "co.id")
            ->join("pessoa as pe", "co.id_locatario", "=", "pe.id")
            ->join("status as st", "pa.id_status", "=", "st.id")
            ->leftJoin("forma_pagamento as fp", "pa.id_forma_pagamento", "=", "fp.id")
            ->join("imovel as im", "co.id_imovel", "=", "im.id")
            ->when($imovel, function ($query) use ($params) {
                return $query->where('co.id_imovel', $params['id_imovel']);
            })
            ->when($locatario, function ($query) use ($params) {
                return $query->where('co.id_locatario', $params['id_locatario']);
            })
            ->when($tipoContrato, function ($query) use ($params) {
                return $query->where('co.id_tipo_contrato', $params['id_tipo_contrato']);
            })
            ->when($formaPagamento, function ($query) use ($params) {
                return $query->where('pa.id_forma_pagamento', $params['id_forma_pagamento']);
            })
            ->when($status, function ($query) use ($params) {
                return $query->where('pa.id_status', $params['id_status']);
            })
            ->when($periodos, function ($query) use ($params) {
                return $query->whereRaw("(pa.periodo_inicial >= ? AND pa.periodo_final <= ?)",
                    [$params['periodo_inicial'], $params['periodo_final']]);
            })
            ->when($this->user['id_perfil'] != 1, function ($query) {
                return $query->where('pe.token', $this->user['token']);
            })
            ->orderBy( "pe.nome", "asc")
            ->orderBy("pa.data_vencimento","asc")
            ->get()
            ->toArray();
    }

    public function getByContrato($id)
    {
        return self::select(
            "pa.*",
            "st.nome as status"
        )
            ->from("parcela as pa")
            ->join("contrato as co", "pa.id_contrato", "=", "co.id")
            ->join("status as st", "pa.id_status", "=", "st.id")
            ->where("pa.id_contrato", $id)
            ->orderBy("pa.parcela")
            ->get()
            ->toArray();
    }

    public function getParcelas($idContrato)
    {
        $parcela = 1;
        $contrato = Contrato::find($idContrato);
        if ($contrato['id_tipo_contrato'] == 1) {
            $vencimentos = $this->gerarVencimentos($contrato['primeiro_vencimento'], $contrato['vigencia']);
        } else {
            $vencimentos = $this->gerarVencimentos($contrato['primeiro_vencimento'], 1);
        }
        $itens = (new ItemContrato())->getByContrato($idContrato);
        $valorTotal = $this->getValorTotal($idContrato, $contrato['valor']);
        $totalParcelas = count($vencimentos);

        foreach ($vencimentos as $vencimento) {
            $periodos = $this->gerarVencimentos($vencimento, 2);
            $parcelas[] = [
                'id_status' => 4,
                'id_contrato' => $idContrato,
                'data_vencimento' => $vencimento,
                'valor' => $contrato['valor'],
                'valor_total' => $valorTotal,
                'parcela' => $parcela . '/' . $totalParcelas,
                'periodo_inicial' => $vencimento,
                'dias' => $contrato['dias'],
                'periodo_final' => date('Y-m-d', strtotime($periodos[1] . ' -1 days')),
                'itens' => $itens
            ];

            $parcela++;
        }

        return $parcelas;
    }

    public function gerarParcelas($id)
    {
        $parcela = 1;
        $contrato = Contrato::find($id);
        if ($contrato['id_tipo_contrato'] == 1) {
            $vencimentos = $this->gerarVencimentos($contrato['primeiro_vencimento'], $contrato['vigencia']);
        } else {
            $vencimentos = $this->gerarVencimentos($contrato['primeiro_vencimento'], 1);
        }
        $itens = (new ItemContrato())->getByContrato($id);
        $valorTotal = $this->getValorTotal($id, $contrato['valor']);
        $totalParcelas = count($vencimentos);
        foreach ($vencimentos as $vencimento) {
            $periodos = $this->gerarVencimentos($vencimento, 2);
            $parcelas[] = [
                'id_status' => 4,
                'id_contrato' => $id,
                'id_forma_pagamento' => $contrato['id_forma_pagamento'],
                'data_vencimento' => $vencimento,
                'competencia' => $vencimento,
                'valor' => $valorTotal,
                'parcela' => $parcela . '/' . $totalParcelas,
                'periodo_inicial' => $vencimento,
                'periodo_final' => date('Y-m-d', strtotime($periodos[1] . ' -1 days'))
            ];
            $parcela++;
        }
        return $this->saveParcela($parcelas, $itens);
    }

    private function saveParcela($parcelas, $itens)
    {
        foreach ($parcelas as $parcela) {
            $idParcela = self::create($parcela)->id;
            foreach ($itens as $item) {
                DB::transaction(function () use ($idParcela, $item) {
                    ParcelaItem::create([
                        'id_parcela' => $idParcela,
                        'id_item' => $item['id_item'],
                        'valor' => $item['valor']
                    ]);
                });
            }
        }
    }

    public function updateParcela($dados, $id)
    {
        DB::transaction(function () use ($dados, $id) {
            //atualiza os itens de parcela caso já existam ou cadastra caso não existam
            foreach ($dados['itens'] as $item) {
                if (!empty($item['id'])) {
                    ParcelaItem::where('id', $item['id'])
                        ->update($item);
                } else {
                    ParcelaItem::create($item);
                }
            }
            //soma os valores dos itens da fatura para atualizar o valor da fatura
            $somaItens = DB::table("parcela_item")
                ->select(
                    DB::raw("sum(parcela_item.valor) as soma")
                )
                ->where("parcela_item.id_parcela", $id)
                ->first();

            $valorParcela = DB::table("contrato")
                ->select(
                    DB::raw("contrato.valor")
                )
                ->join("parcela", "contrato.id", "=", "parcela.id_contrato")
                ->where("parcela.id", $id)
                ->first();

            $soma = $somaItens->soma + $valorParcela->valor;

            //atualiza os dados da parcela
            self::where("id", $id)
                ->update([
                    "id_forma_pagamento" => $dados['id_forma_pagamento'],
                    "data_vencimento" => $dados['data_vencimento'],
                    "valor" => $soma,
                ]);
        });
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
        $DP = array($ano, $mes, $dia);
// ARRAY PARA AS DATAS
        $data_array = array($DP[0], $DP[1], $DP[2]);
        $data_array2 = array($DP[0], $DP[1], $DP[2]);
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