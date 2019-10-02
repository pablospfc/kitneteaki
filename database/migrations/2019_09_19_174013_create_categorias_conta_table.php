<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriasContaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoria_conta', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_tipo_conta")->unsigned();
            $table->foreign("id_tipo_conta")->references("id")->on("tipo_conta");
            $table->string("nome");
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
        Schema::dropIfExists('categoria_conta');
    }
}
