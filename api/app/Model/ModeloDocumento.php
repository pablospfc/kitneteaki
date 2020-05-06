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

    public function getDocumentoContrato($id, $idContrato){
      $modelo = self::find($id);
      $contrato = Contrato::select(
         "im.nome as imovel",
         "pr.nome as proprietario",
         "in.nome as inquilino",
         "co.valor as valor",
         "co.vigencia as vigencia"
      )->from("contrato as co")
          ->leftJoin("pessoa as pr", "co.id_locador", "=", "pr.id")
          ->join("pessoa as in", "co.id_locatario", "=", "in.id")
          ->join("imovel as im", "co.id_imovel", "=", "im.id")
          ->where("co.id", $idContrato)
          ->first();

      $documento = str_replace([
          "*proprietario*",
          "*inquilino*",
          "*imovel*",
          "*valor*",
          "*vigencia*"
      ],[
          $contrato['proprietario'],
          $contrato['inquilino'],
          $contrato['imovel'],
          $contrato['valor'],
          $contrato['vigencia']
      ], $modelo['conteudo']);

      return $documento;
    }


}