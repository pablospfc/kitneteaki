<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentoContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documento_contrato', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_tipo_documento_contrato")->unsigned();
            $table->foreign("id_tipo_documento_contrato")->references("id")->on("tipo_documento_contrato");
            $table->integer("id_contrato")->unsigned();
            $table->foreign("id_contrato")->references("id")->on("contrato");
            $table->string("caminho_arquivo");
            $table->string("nome_arquivo");
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
        Schema::dropIfExists('documento_contrato');
    }
}
