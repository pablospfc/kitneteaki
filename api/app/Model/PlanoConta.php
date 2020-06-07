<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;

class PlanoConta extends Model
{
    protected $table = "plano_conta";
    protected $primaryKey = "id";
    public $timestamps = true;
    protected $fillable = [
        "id_tipo_conta",
        "nome"
    ];

}