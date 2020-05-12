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
          "inq.nome as nome_inquilino",
          "inq.rg as rg_inquilino",
          "inq.cpf_cnpj as cpf_cnpj_inquilino",
          "inq.passaporte as passaporte_inquilino",
          "eci.nome as estado_civil_inquilino",
          "nci.nome as nacionalidade_inquilino",
          "inq.orgao_expedidor as orgao_exp_inquilino",
          "inq.profissao as profissao_inquilino",
          "inq.cep as cep_inquilino",
          "inq.logradouro as logradouro_inquilino",
          "inq.bairro as bairro_inquilino",
          "inq.email as email_inquilino",
          "inq.telefone_celular as telefone_inquilino",
          "pro.nome as nome_proprietario",
          "pro.rg as rg_proprietario",
          "pro.cpf_cnpj as cpf_cnpj_proprietario",
          "pro.passaporte as passaporte_proprietario",
          "ecp.nome as estado_civil_proprietario",
          "ncp.nome as naturalidade_proprietario",
          "pro.orgao_expedidor as orgao_exp_proprietario",
          "pro.profissao as profissao_proprietario",
          "pro.cep as cep_proprietario",
          "pro.logradouro as logradouro_proprietario",
          "pro.bairro as bairro_proprietario",
          "pro.email as email_proprietario",
          "pro.telefone_celular as telefone_proprietario",
          "con.valor_total as valor_total_contrato",
          "con.dia_vencimento as dia_vencimento_contrato",
          "con.data_inicio as data_inicio_contrato",
          "con.data_fim as data_fim_contrato",
          "con.vigencia as vigencia_contrato",
          "con.dias as dias_contrato",
          "fpg.nome as forma_pagamento_contrato",
          "imo.nome as nome_imovel",
          "imo.valor_imovel as valor_imovel",
          "imo.numero as numero_imovel",
          "imo.logradouro as logradouro_imovel",
          "imo.cep as cep_imovel",
          "imo.complemento as complemento_imovel",
          "imo.bairro as bairro_imovel",
          "imo.cidade as cidade_imovel",
          "imo.estado as estado_imovel"
      )->from("contrato as con")
          ->leftJoin("pessoa as pro", "con.id_locador", "=", "pro.id")
          ->join("pessoa as inq", "con.id_locatario", "=", "inq.id")
          ->join("imovel as imo", "con.id_imovel", "=", "imo.id")
          ->join("estado_civil as eci", "inq.id_estado_civil", "=", "eci.id")
          ->leftJoin("estado_civil as ecp", "pro.id_estado_civil", "=", "ecp.id")
          ->join("nacionalidade as nci", "inq.id_nacionalidade", "=", "nci.id")
          ->leftJoin("nacionalidade as ncp", "pro.id_nacionalidade", "=", "ncp.id")
          ->join("forma_pagamento as fpg", "con.id_forma_pagamento", "=", "fpg.id")
          ->where("con.id", $idContrato)
          ->first();

      $documento = str_replace([
          "nome_inquilino",
          "rg_inquilino",
          "cpf_cnpj_inquilino",
          "passaporte_inquilino",
          "estado_civil_inquilino",
          "naturalidade_inquilino",
          "orgao_exp_inquilino",
          "profissao_inquilino",
          "cep_inquilino",
          "logradouro_inquilino",
          "bairro_inquilino",
          "email_inquilino",
          "telefone_inquilino",
          "nome_proprietario",
          "rg_proprietario",
          "cpf_cnpj_proprietario",
          "passaporte_proprietario",
          "estado_civil_proprietario",
          "naturalidade_proprietario",
          "orgao_exp_proprietario",
          "profissao_proprietario",
          "cep_proprietario",
          "logradouro_proprietario",
          "bairro_proprietario",
          "email_proprietario",
          "telefone_proprietario",
          "valor_total_contrato",
          "dia_vencimento_contrato",
          "data_inicio_contrato",
          "data_fim_contrato",
          "vigencia_contrato",
          "dias_contrato",
          "forma_pagamento_contrato",
          "nome_imovel",
          "valor_imovel",
          "numero_imovel",
          "logradouro_imovel",
          "cep_imovel",
          "complemento_imovel",
          "bairro_imovel",
          "cidade_imovel",
          "estado_imovel",
      ],[
          $contrato['nome_inquilino'],
          $contrato["rg_inquilino"],
          $contrato["cpf_inquilino"],
          $contrato["passaporte_inquilino"],
          $contrato["estado_civil_inquilino"],
          $contrato["naturalidade_inquilino"],
          $contrato["orgao_exp_inquilino"],
          $contrato["profissao_inquilino"],
          $contrato["cep_inquilino"],
          $contrato["logradouro_inquilino"],
          $contrato["bairro_inquilino"],
          $contrato["email_inquilino"],
          $contrato["telefone_inquilino"],
          $contrato["nome_proprietario"],
          $contrato["rg_proprietario"],
          $contrato["cpf_cnpj_proprietario"],
          $contrato["passaporte_proprietario"],
          $contrato["estado_civil_proprietario"],
          $contrato["naturalidade_proprietario"],
          $contrato["orgao_exp_proprietario"],
          $contrato["profissao_proprietario"],
          $contrato["cep_proprietario"],
          $contrato["logradouro_proprietario"],
          $contrato["bairro_proprietario"],
          $contrato["email_proprietario"],
          $contrato["telefone_proprietario"],
          $contrato["valor_total_contrato"],
          $contrato["dia_vencimento_contrato"],
          $contrato["data_inicio_contrato"],
          $contrato["data_fim_contrato"],
          $contrato["vigencia_contrato"],
          $contrato["dias_contrato"],
          $contrato["forma_pagamento_contrato"],
          $contrato["nome_imovel"],
          $contrato["valor_imovel"],
          $contrato["numero_imovel"],
          $contrato["logradouro_imovel"],
          $contrato["cep_imovel"],
          $contrato["complemento_imovel"],
          $contrato["bairro_imovel"],
          $contrato["cidade_imovel"],
          $contrato["estado_imovel"],
      ], $modelo['conteudo']);

      return $documento;
    }


}