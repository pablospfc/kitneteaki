<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;

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
}