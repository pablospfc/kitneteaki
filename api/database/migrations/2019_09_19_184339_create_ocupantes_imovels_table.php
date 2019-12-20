<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOcupantesImovelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ocupante_imovel', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_contrato")->unsigned();
            $table->foreign("id_contrato")->references("id")->on("contrato");
            $table->string("nome");
            $table->string("cpf");
            $table->string("descricao");
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
        Schema::dropIfExists('ocupante_imovel');
    }
}
