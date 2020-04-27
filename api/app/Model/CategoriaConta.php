<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class CategoriaConta extends Model
{
    protected $table = "categoria_conta";
    protected $primaryKey = "id";
    public $timestamps = true;
    protected $fillable = [
      "id_tipo_conta",
      "nome"
    ];
}
