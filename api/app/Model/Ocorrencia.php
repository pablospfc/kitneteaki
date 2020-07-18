<?php
namespace App\Model;
use Illuminate\Database\Eloquent\Model;

class Ocorrencia extends Model {

    protected $table = "ocorrencia";
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
      "id_tipo_ocorrencia",
      "data",
      "hora",
      "descricao",
    ];
}