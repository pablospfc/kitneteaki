<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class FiadorContrato extends Model
{
    protected $table = "fiador_contrato";
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "id",
        "id_fiador",
        "id_contrato",
    ];

    public function getByContrato($id){
        return self::select(
            "fi.id as id",
            "pe.id as id_fiador",
            "co.id as id_contrato",
            "pe.nome as nome"
        )
            ->from("fiador_contrato as fi")
            ->join("pessoa as pe", "fi.id_fiador", "=", "pe.id")
            ->join("contrato as co", "fi.id_contrato", "=", "co.id")
            ->where("co.id", $id)
            ->get()
            ->toArray();
    }
}
