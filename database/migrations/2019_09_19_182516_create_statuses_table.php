<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('status', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_tipo_status")->unsigned();
            $table->foreign("id_tipo_status")->references("id")->on("tipo_status");
            $table->string("nome");
            $table->timestamps();
        });

        DB::table('status')->insert([
            ['id_tipo_status' => 1, 'nome' => 'Vigente'],
            ['id_tipo_status' => 1, 'nome' => 'Cancelado'],
            ['id_tipo_status' => 1, 'nome' => 'Vencido'],
            ['id_tipo_status' => 2, 'nome' => 'Em Aberto'],
            ['id_tipo_status' => 2, 'nome' => 'Atrasado'],
            ['id_tipo_status' => 2, 'nome' => 'Liquidado'],
            ['id_tipo_status' => 3, 'nome' => 'Disponível'],
            ['id_tipo_status' => 3, 'nome' => 'Reservado'],
            ['id_tipo_status' => 3, 'nome' => 'Alugado'],
            ['id_tipo_status' => 3, 'nome' => 'Suspenso'],


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
        Schema::dropIfExists('status');
    }
}
