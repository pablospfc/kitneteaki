<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;

class ParcelaItem extends Model
{
    protected $table = "parcela_item";
    protected $primaryKey = "id";
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "id_parcela",
        "id_item",
        "valor",
    ];
}