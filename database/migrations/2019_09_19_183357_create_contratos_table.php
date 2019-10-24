<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contrato', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_contrato")->unsigned();
            $table->foreign("id_contrato")->references("id")->on("contrato");
            $table->integer("id_status")->unsigned();
            $table->foreign("id_status")->references("id")->on("status");
            $table->integer("id_locatario")->unsigned();
            $table->foreign("id_locatario")->references("id")->on("pessoa");
            $table->integer("id_locador")->unsigned();
            $table->foreign("id_locador")->references("id")->on("pessoa");
            $table->integer("id_imovel")->unsigned();
            $table->foreign("id_imovel")->references("id")->on("imovel");
            $table->integer("id_tipo_contrato")->unsigned();
            $table->foreign("id_tipo_contrato")->references("id")->on("tipo_contrato");
            $table->decimal("valor");
            $table->date("primeiro_vencimento");
            $table->char("dia_vencimento",2);
            $table->date("data_inicio");
            $table->date("data_fim");
            $table->integer("vigencia");
            $table->string("referencia")->nullable();
            $table->longText("observacoes")->nullable();
            $table->boolean("renovou");
            $table->string("chave")->nullable();
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
        Schema::dropIfExists('contrato');
    }
}
