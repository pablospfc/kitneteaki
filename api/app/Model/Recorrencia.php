<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;

class Recorrencia extends Model
{
    protected $table = "recorrencia_conta";
    protected $primaryKey = "id";
    public $timestamps = true;
    protected $fillable = [
        "nome"
    ];

}