<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mes', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        DB::table('mes')->insert([
            ['nome' => 'Janeiro'],
            ['nome' => 'Fevereiro'],
            ['nome' => 'Março'],
            ['nome' => 'Abril'],
            ['nome' => 'Maio'],
            ['nome' => 'Junho'],
            ['nome' => 'Julho'],
            ['nome' => 'Agosto'],
            ['nome' => 'Setembro'],
            ['nome' => 'Outubro'],
            ['nome' => 'Novembro'],
            ['nome' => 'Dezembro']
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
        Schema::dropIfExists('mes');
    }
}
