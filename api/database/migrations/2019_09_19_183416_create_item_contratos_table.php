<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_contrato', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_contrato")->unsigned();
            $table->foreign("id_contrato")->references("id")->on("contrato");
            $table->integer("id_item")->unsigned();
            $table->foreign("id_item")->references("id")->on("item");
            $table->string("valor");
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
        Schema::dropIfExists('item_contrato');
    }
}
