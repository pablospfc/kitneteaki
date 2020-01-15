<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ItemContrato extends Model
{
    protected $table = "item_contrato";
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "id",
        "id_contrato",
        "id_item",
        "valor",
    ];

    public function getByContrato($id) {
        return self::select(
            "ic.id as id",
            "it.id as id_item",
            "it.nome as item",
            "ic.valor as valor"
        )
            ->from("item_contrato as ic")
            ->join("item as it", "ic.id_item", "=", "it.id")
            ->where("ic.id_contrato", "=", $id)
            ->get()
            ->toArray();
    }
}
