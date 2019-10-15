<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImovelTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imovel', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_tipo_imovel")->unsigned();
            $table->foreign("id_tipo_imovel")->references("id")->on("tipo_imovel");
            $table->integer("id_status")->unsigned();
            $table->foreign("id_status")->references("id")->on("status");
            $table->integer("id_transacao_imovel")->unsigned();
            $table->foreign("id_transacao_imovel")->references("id")->on("transacao_imovel");
            $table->string("nome");
            $table->string("logradouro");
            $table->string("condominio")->nullable();
            $table->string("apartamento")->nullable();
            $table->string("latitude")->nullable();
            $table->string("longitude")->nullable();
            $table->string("ponto_referencia")->nullable();
            $table->string("bloco")->nullable();
            $table->decimal("valor_iptu")->nullable();
            $table->decimal("valor_condominio")->nullable();
            $table->decimal("valor_imovel");
            $table->string("numero")->nullable();
            $table->string("cep");
            $table->string("complemento")->nullable();
            $table->string("bairro");
            $table->string("cidade");
            $table->string("estado");
            $table->string("chave")->nullable();
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
        Schema::dropIfExists('imovel');
    }
}
