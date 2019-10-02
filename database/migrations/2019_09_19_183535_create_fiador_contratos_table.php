<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFiadorContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fiador_contrato', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_fiador")->unsigned();
            $table->foreign("id_fiador")->references("id")->on("pessoa");
            $table->integer("id_contrato")->unsigned();
            $table->foreign("id_contrato")->references("id")->on("contrato");
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
        Schema::dropIfExists('fiador_contrato');
    }
}
