<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conta', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_mes")->unsigned();
            $table->foreign("id_mes")->references("id")->on("mes");
            $table->integer("id_categoria_conta")->unsigned();
            $table->foreign("id_categoria_conta")->references("id")->on("categoria_conta");
            $table->integer("ano");
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
        Schema::dropIfExists('conta');
    }
}
