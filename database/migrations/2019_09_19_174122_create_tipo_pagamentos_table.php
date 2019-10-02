<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTipoPagamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_pagamento', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        DB::table('tipo_pagamento')->insert([
            ['nome' => 'Dinheiro'],
            ['nome' => 'Boleto Bancário'],
            ['nome' => 'Cartão de Crédito']
            ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipo_pagamento');
    }
}
