<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTipoDocumentoContratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_documento_contrato', function (Blueprint $table) {
            $table->increments('id');
            $table->string("nome");
            $table->timestamps();
        });

        DB::table('tipo_documento_contrato')->insert([
            ['nome' => 'RG'],
            ['nome' => 'CPF'],
            ['nome' => 'Comporvante de Residência'],
            ['nome' => 'Laudo de Vistoria']
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
        Schema::dropIfExists('tipo_documento_contrato');
    }
}
