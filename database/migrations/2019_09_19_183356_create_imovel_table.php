<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImovelTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imovel', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_tipo_imovel")->unsigned();
            $table->foreign("id_tipo_imovel")->references("id")->on("tipo_imovel");
            $table->string("nome");
            $table->string("logradouro");
            $table->string("condominio");
            $table->string("apartamento");
            $table->string("latitude");
            $table->string("longitude");
            $table->string("ponto_referencia");
            $table->string("bloco");
            $table->string("numero");
            $table->string("cep");
            $table->string("complemento");
            $table->string("bairro");
            $table->string("cidade");
            $table->string("estado");
            $table->boolean("disponivel");
            $table->string("chave");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('imovel');
    }
}
