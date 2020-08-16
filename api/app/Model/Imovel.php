<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Imovel extends Model
{
    protected $table = "imovel";
    public $timestamps = true;
    private $user;
    protected $fillable = [
      "id_tipo_imovel",
      "id_status",
      "id_transacao_imovel",
      "nome",
      "logradouro",
      "condominio",
      "apartamento",
      "latitude",
      "longitude",
      "ponto_referencia",
      "bloco",
      "valor_iptu",
      "valor_condominio",
      "valor_imovel",
      "numero",
      "cep",
      "complemento",
      "bairro",
      "cidade",
      "estado",
      "token"
    ];

    public function __construct(array $attributes = [])
    {
        $this->user = (auth('api'))->user();
        parent::__construct($attributes);
    }

    public function getAll() {
        return self::select(
          "imo.id as id",
          "imo.nome as nome",
          "sta.id as id_status",
          "sta.nome as status",
          "tip.nome as tipo_imovel",
          "tra.nome as transacao_imovel",
          "imo.valor_imovel as valor_imovel"
        )
            ->from("imovel as imo")
            ->join("tipo_imovel as tip","imo.id_tipo_imovel","=","tip.id")
            ->join("transacao_imovel as tra","imo.id_transacao_imovel", "=", "tra.id")
            ->join("status as sta", "imo.id_status", "=", "sta.id")
            ->when($this->user['id_perfil'] != 1, function ($query) {
                return $query->where('imo.token', $this->user['token']);
            })
            ->orderBy("imo.nome")
            ->get()
            ->toArray();
    }

    public function getByTransacao($id) {
        return self::select(
            "imo.id as id",
            "imo.nome as nome",
            "sta.nome as status",
            "tip.nome as tipo_imovel",
            "tra.nome as transacao_imovel",
            "imo.valor_imovel as valor_imovel"
        )
            ->from("imovel as imo")
            ->join("tipo_imovel as tip","imo.id_tipo_imovel","=","tip.id")
            ->join("transacao_imovel as tra","imo.id_transacao_imovel", "=", "tra.id")
            ->join("status as sta", "imo.id_status", "=", "sta.id")
            ->where("imo.id_transacao_imovel",$id)
            ->when($this->user['id_perfil'] != 1, function ($query) {
                return $query->where('imo.token', $this->user['token']);
            })
            ->orderBy("imo.nome")
            ->get()
            ->toArray();
    }

    public static function setOcupado($idImovel, $idTipoContrato) {
        if ($idTipoContrato == 1)
            $idStatus = 9;
        else
            $idStatus = 8;
        return self::where('id', $idImovel)
            ->update(['id_status' => $idStatus]);
    }

    public static function setDisponivel($idImovel) {
        return self::where('id', $idImovel)
            ->update(['id_status' => 7]);
    }
}
