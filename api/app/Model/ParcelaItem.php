<?php


namespace App\Model;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
        DB::transaction(function () use ($id) {
            $parcelaItem = self::find($id);
            $parcela = Parcela::find($parcelaItem['id_parcela']);
            $novoValor = $parcela['valor'] - $parcelaItem['valor'];
            self::destroy($id);
            Parcela::where('id', $parcela['id'])
                ->update(['valor' => $novoValor]);
        });
    }
}