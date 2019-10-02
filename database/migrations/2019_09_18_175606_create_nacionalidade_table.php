<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNacionalidadeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nacionalidade', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        DB::table('nacionalidade')->insert([
                ['nome' => 'Brasileiro'],
                ['nome' => 'Estrangeiro']
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
        Schema::dropIfExists('nacionalidade');
    }
}
