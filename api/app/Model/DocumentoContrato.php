<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class DocumentoContrato extends Model
{
    protected $table = "documento_contrato";
    protected $primaryKey = "id";
    public $timestamps = true;

    protected $fillable = [
      "id_tipo_documento_contrato",
      "id_contrato",
      "caminho_arquivo",
      "nome_arquivo"
    ];
}
