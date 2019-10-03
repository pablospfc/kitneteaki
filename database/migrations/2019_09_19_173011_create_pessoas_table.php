<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePessoasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pessoa', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_estado_civil")->unsigned();
            $table->foreign("id_estado_civil")->references("id")->on("estado_civil");
            $table->integer("id_tipo_pessoa")->unsigned();
            $table->foreign("id_tipo_pessoa")->references("id")->on("tipo_pessoa");
            $table->integer("id_categoria_pessoa")->unsigned();
            $table->foreign("id_categoria_pessoa")->references("id")->on("categoria_pessoa");
            $table->integer("id_genero")->unsigned();
            $table->foreign("id_genero")->references("id")->on("genero");
            $table->integer("id_nacionalidade")->unsigned();
            $table->foreign("id_nacionalidade")->references("id")->on("nacionalidade");
            $table->integer("id_cidade")->unsigned()->nullable();
            $table->foreign("id_cidade")->references("id")->on("cidade");
            $table->string("nome");
            $table->string("rg")->nullable();
            $table->string("cpf_cnpj")->nullable();
            $table->string("passaporte")->nullable();
            $table->date("data_nascimento");
            $table->string("orgao_expedidor")->nullable();
            $table->date("data_emissao");
            $table->string("profissao");
            $table->string("telefone_celular");
            $table->string("whatsapp");
            $table->string("email");
            $table->boolean("disponivel");
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
        Schema::dropIfExists('pessoa');
    }
}
