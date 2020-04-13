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
        }

    }
}
