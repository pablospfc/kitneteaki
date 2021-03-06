<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pessoa extends Model
{

    protected $table = "pessoa";
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = true;
    private $user;
    protected $fillable = [
        "id_estado_civil",
        "id_tipo_pessoa",
        "id_genero",
        "id_categoria_pessoa",
        "id_nacionalidade",
        "nome",
        "cpf_cnpj",
        "rg",
        "passaporte",
        "data_nascimento",
        "orgao_expedidor",
        "data_emissao",
        "email",
        "telefone_celular",
        "whatsapp",
        "cep",
        "logradouro",
        "bairro",
        "cidade",
        "estado",
        "numero",
        "complemento",
        "profissao",
        "token"
    ];

    public function __construct(array $attributes = [])
    {
        $this->user = auth('api')->user();
        parent::__construct($attributes);
    }

    public function inserir($data) {
        DB::transaction(function () use ($data) {
            $idPessoa = self::create($data['data_pessoa'])->id;
            if (!empty($data['data_usuario'])){
                switch ($data['data_pessoa']['id_categoria_pessoa']) {
                    case 1: $idPerfil = 2; //Proprietário
                    break;
                    case 2: $idPerfil = 3; //Inquilino
                    break;
                    case 5: $idPerfil = 4; //Operador de Sistema
                }
                $idUsuario = User::create([
                  "name"           => $data['data_pessoa']["nome"],
                  "id_pessoa"      => $idPessoa,
                  "id_perfil"      => $idPerfil,
                  "login"          => $data['data_pessoa']['cpf_cnpj'],
                  "password"       => bcrypt($data['data_usuario']['password']),
                  "remember_token" => str_random(10),
                  "ativo"          => true
                ])->id;

                if ($idPerfil == 4) {
//                    User::where("id", $idUsuario)
//                        ->update(["token" => md5(uniqid($idUsuario, true))]);
                    User::where("id", $idUsuario)
                        ->update(["token" => $this->user['token']]);
                }
            }
        });

    }

    public function getAll(){
        return self::select(
            "pe.id",
            "pe.nome as nome",
            "pe.cpf_cnpj as cpf_cnpj",
            "pe.passaporte as passaporte",
            "pe.whatsapp as whatsapp",
            "pe.data_nascimento as data_nascimento",
            "cp.nome as categoria",
            "na.nome as nacionalidade",
            "tp.nome as tipo_pessoa"
        )
            ->from("pessoa as pe")
            ->join("nacionalidade as na", "pe.id_nacionalidade", "=", "na.id")
            ->join("categoria_pessoa as cp", "pe.id_categoria_pessoa", "=", "cp.id")
            ->leftJoin("tipo_pessoa as tp","pe.id_tipo_pessoa", "=", "tp.id")
            ->when($this->user['id_perfil'] != 1, function ($query) {
                return $query->where('pe.token', $this->user['token']);
            })
            ->get()
            ->toArray();
    }
}
