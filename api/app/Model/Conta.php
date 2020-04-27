<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use phpDocumentor\Reflection\Types\Self_;

class Conta extends Model
{
    protected $table = "conta";
    protected $primaryKey = "id";
    public $timestamps = true;

    protected $fillable = [
        "id_categoria_conta",
        "descricao",
        "valor",
        "id_recorrencia_conta",
        "id_imovel",
        "ocorrencia",
        "observacoes",
        "competencia",
        "data_vencimento",
    ];

    /*
    public function listar(){
        return self::select(
            "con.*",
            "ctg.nome as categoria",
            "rec.nome as recorrencia",
            "imo.nome as imovel",
            "tip.id as id_tipo_conta",
            "tip.nome as tipo"
        )
            ->from("conta as con")
            ->join("categoria_conta as ctg", "con.id_categoria_conta", "=", "ctg.id")
            ->join("recorrencia_conta as rec", "con.id_recorrencia_conta", "=", "rec.id")
            ->join("tipo_conta as tip", "ctg.id_tipo_conta", "=", "tip.id")
            ->leftJoin("imovel as imo", "con.id_imovel", "=", "imo.id")
            ->orderBy("con.competencia")
            ->get()
            ->toArray();
    }
    */

    public function listar($params)
    {

        $tipo = false;
        $categoria = false;
        $status = false;
        $periodos = false;
        $valores = false;
        $imovel = false;

        error_log(var_export($params,true));

        if (isset($params['id_tipo_conta']))
            $tipo = true;
        if (isset($params['id_categoria_conta']))
            $categoria = true;
        if (isset($params['id_status']))
            $status = true;
        if(isset($params['periodo_inicial']) && isset($params['periodo_final']))
            $periodos = true;
        if(isset($params['valor_inicial']) && isset($params['valor_final']))
            $valores = true;
        if (isset($params['id_imovel']))
            $imovel = true;


        return self::select(
            "con.*",
            "ctg.nome as categoria",
            "rec.nome as recorrencia",
            "imo.nome as imovel",
            "tip.id as id_tipo_conta",
            "tip.nome as tipo"
        )
            ->from("conta as con")
            ->join("categoria_conta as ctg", "con.id_categoria_conta", "=", "ctg.id")
            ->join("recorrencia_conta as rec", "con.id_recorrencia_conta", "=", "rec.id")
            ->join("tipo_conta as tip", "ctg.id_tipo_conta", "=", "tip.id")
            ->leftJoin("imovel as imo", "con.id_imovel", "=", "imo.id")
            ->when($tipo, function ($query) use ($params)  {
                return $query->where('ctg.id_tipo_conta', $params['id_tipo_conta']);
            })
            ->when($categoria, function ($query) use ($params)  {
                return $query->where('con.id_categoria_conta', $params['id_categoria_conta']);
            })
            ->when($status, function ($query) use ($params)  {
                return $query->where('con.id_status', $params['id_status']);
            })
            ->when($periodos, function ($query) use ($params) {
                return $query->whereRaw("(con.data_vencimento BETWEEN ? AND ?)",
                    [$params['periodo_inicial'], $params['periodo_final']]);
            })
            ->when($valores, function ($query) use ($params) {
                return $query->whereRaw("(con.valor >= ? AND con.valor <= ?)",
                    [$params['valor_inicial'], $params['valor_final']]);
            })
            ->when($imovel, function ($query) use ($params)  {
                return $query->where('con.id_imovel', $params['id_imovel']);
            })
            ->orderBy("con.competencia")
            ->get()
            ->toArray();
    }

    public function getById($id) {
        return self::select(
            "con.*",
            "tip.id as id_tipo_conta"
        )
            ->from("conta as con")
            ->join("categoria_conta as ctg", "con.id_categoria_conta", "=", "ctg.id")
            ->join("tipo_conta as tip", "ctg.id_tipo_conta", "=", "tip.id")
            ->where("con.id", $id)
            ->first();
    }

    public function salvar($data)
    {
        if (isset($data['repetir_lancamento'])) {
            $ocorrencia = $data['ocorrencia'];
            $dataVencimento = $data['data_vencimento'];
            for ($i = 0; $i< $ocorrencia; $i++){
                switch ($data['id_recorrencia_conta']){
                    case 1:
                        $date = date('Y-m-d', strtotime('+1 days', strtotime($data['data_vencimento'])));
                        $data['competencia'] = ($i == 0 ? $dataVencimento : $date);
                        $data['data_vencimento'] = ($i == 0 ? $dataVencimento : $date);
                        break;
                    case 2:
                        $date = date('Y-m-d', strtotime('+7 days', strtotime($data['data_vencimento'])));
                        $data['competencia'] = ($i == 0 ? $dataVencimento : $date);
                        $data['data_vencimento'] = ($i == 0 ? $dataVencimento : $date);
                        break;
                    case 3:
                        $date = date('Y-m-d', strtotime('+1 month', strtotime($data['data_vencimento'])));
                        $data['competencia'] = ($i == 0 ? $dataVencimento : $date);
                        $data['data_vencimento'] = ($i == 0 ? $dataVencimento : $date);
                        break;
                    case 4:
                        $date = date('Y-m-d', strtotime('+2 month', strtotime($data['data_vencimento'])));
                        $data['competencia'] = ($i == 0 ? $dataVencimento : $date);
                        $data['data_vencimento'] = ($i == 0 ? $dataVencimento : $date);
                        break;
                    case 5:
                        $date = date('Y-m-d', strtotime('+3 month', strtotime($data['data_vencimento'])));
                        $data['competencia'] = ($i == 0 ? $dataVencimento : $date);
                        $data['data_vencimento'] = ($i == 0 ? $dataVencimento : $date);
                        break;
                    case 6:
                        $date = date('Y-m-d', strtotime('+6 month', strtotime($data['data_vencimento'])));
                        $data['competencia'] = ($i == 0 ? $dataVencimento : $date);
                        $data['data_vencimento'] = ($i == 0 ? $dataVencimento : $date);
                        break;
                    case 7:
                        $date = date('Y-m-d', strtotime('+1 years', strtotime($data['data_vencimento'])));
                        $data['competencia'] = ($i == 0 ? $dataVencimento : $date);
                        $data['data_vencimento'] = ($i == 0 ? $dataVencimento : $date);
                        break;
                }
                 self::create($data);
            }
            return;
        }

        self::create($data);

    }


}
