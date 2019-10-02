<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstadoCivilsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estado_civil', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        DB::table('estado_civil')->insert([
            ['nome' => 'Solteiro(a)'],
            ['nome' => 'Casado(a)'],
            ['nome' => 'Separado(a)'],
            ['nome' => 'Divorciado(a)'],
            ['nome' => 'Viúvo(a)']
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
        Schema::dropIfExists('estado_civil');
    }
}
