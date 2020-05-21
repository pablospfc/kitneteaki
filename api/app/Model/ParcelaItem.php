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

    public function remove($id) {
        $parcelaItem = self::find($id);
        //$valor = $parcela['valor'];
        self::destroy($id);
        self::where('id', $id)
            ->update(['valor' => 1]);
    }
}