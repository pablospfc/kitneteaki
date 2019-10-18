<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
//https://stackoverflow.com/questions/11076975/insert-text-into-textarea-at-cursor-position-javascript
//https://codepen.io/erikpukinskis/pen/EjaaMY?editors=101
//insert text in textarea at cursor position
class CreateModeloDocumentoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modelo_documento', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_tipo_modelo_documento")->unsigned();
            $table->foreign("id_tipo_modelo_documento")->references("id")->on("tipo_modelo_documento");
            $table->string("nome");
            $table->longText("conteudo");
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
        Schema::dropIfExists('modelo_documento');
    }
}
