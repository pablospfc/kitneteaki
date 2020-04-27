<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;

class ModeloDocumento extends Model
{

    protected $primaryKey = 'id';
    protected $table = "modelo_documento";
    public $timestamps = true;
    protected $fillable = [
        "id_tipo_modelo_documento",
        "nome",
        "conteudo",
    ];

    public function getAll()
    {
        return self::select(
            "mo.*",
            "tp.nome as tipo_modelo_documento"
        )
            ->from("modelo_documento as mo")
            ->join("tipo_modelo_documento as tp", "mo.id_tipo_modelo_documento", "=", "tp.id")
            ->get();
    }


}