<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTipoPessoaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_pessoa', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        DB::table('tipo_pessoa')->insert([
            ['nome' => 'Pessoa Física'],
            ['nome' => 'Pessoa Jurídica']
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
        Schema::dropIfExists('tipo_pessoa');
    }
}
