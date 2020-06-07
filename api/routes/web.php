<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('app');
});

//Route::resource('pessoa', 'PessoaController');

//Route::group(['middleware' => 'jwt.auth'], function() {
Route::group(['middleware' => 'cors'], function() {
    Route::post('auth/login','AuthController@login');
    Route::post('auth/refresh','AuthController@refresh');
    Route::get('auth/logout','AuthController@logout');

    Route::post("pessoa/cadastrar","PessoaController@store");
    Route::put("pessoa/atualizar/{id}","PessoaController@update");
    Route::get("pessoa/listar","PessoaController@index");
    Route::get("pessoa/buscar/{id}","PessoaController@show");
    Route::get("pessoa/getPessoas/{idCategoriaPessoa}","PessoaController@getPessoas");
    Route::delete("pessoa/excluir/{id}","PessoaController@destroy");

    Route::post("imovel/cadastrar","ImovelController@store");
    Route::put("imovel/atualizar/{id}","ImovelController@update");
    Route::get("imovel/listar","ImovelController@index");
    Route::get("imovel/buscar/{id}","ImovelController@show");
    Route::get("imovel/getByTransacao/{id}","ImovelController@getByTransacao");
    Route::delete("imovel/excluir/{id}","ImovelController@destroy");

    Route::post("ocupante/cadastrar","OcupanteImovelController@store");
    Route::put("ocupante/atualizar/{id}","OcupanteImovelController@update");
    Route::get("ocupante/listar","OcupanteImovelController@index");
    Route::get("ocupante/getById/{id}","OcupanteImovelController@show");
    Route::get("ocupante/getByContrato/{id}","OcupanteImovelController@getByContrato");
    Route::delete("ocupante/excluir/{id}","OcupanteImovelController@destroy");

    Route::post("itemcontrato/cadastrar","ItemContratoController@store");
    Route::put("itemcontrato/atualizar/{id}","ItemContratoController@update");
    Route::get("itemcontrato/listar","ItemContratoController@index");
    Route::get("itemcontrato/getById/{id}","ItemContratoController@show");
    Route::get("itemcontrato/getByContrato/{id}","ItemContratoController@getByContrato");
    Route::delete("itemcontrato/excluir/{id}","ItemContratoController@destroy");

    Route::post("testemunha/cadastrar","TestemunhaController@store");
    Route::put("testemunha/atualizar/{id}","TestemunhaController@update");
    Route::get("testemunha/listar","TestemunhaController@index");
    Route::get("testemunha/getById/{id}","TestemunhaController@show");
    Route::get("testemunha/getByContrato/{id}","TestemunhaController@getByContrato");
    Route::delete("testemunha/excluir/{id}","TestemunhaController@destroy");

    Route::post("fiador/cadastrar","FiadorController@store");
    Route::put("fiador/atualizar/{id}","FiadorController@update");
    Route::get("fiador/listar","FiadorController@index");
    Route::get("fiador/getById/{id}","FiadorController@show");
    Route::get("fiador/getByContrato/{id}","FiadorController@getByContrato");
    Route::delete("fiador/excluir/{id}","FiadorController@destroy");

    Route::post("conta/cadastrar","ContaController@store");
    Route::put("conta/atualizar/{id}","ContaController@update");
    Route::get("conta/listar","ContaController@index");
    Route::get("conta/getById/{id}","ContaController@show");
    Route::delete("conta/excluir/{id}","ContaController@destroy");

    Route::post("contrato/cadastrar","ContratoController@store");
    Route::post("contrato/renovar","ContratoController@renovar");
    Route::put("contrato/atualizar/{id}","ContratoController@update");
    Route::put("contrato/setDocumentoContrato/{id}","ContratoController@setDocumentoContrato");
    Route::get("contrato/buscar/{id}","ContratoController@show");
    Route::get("contrato/listar","ContratoController@index");
    Route::delete("contrato/excluir/{id}","ContratoController@destroy");
    Route::put("contrato/concluir/{id}","ContratoController@concluir");

    Route::post("modelodocumento/cadastrar","ModeloDocumentoController@store");
    Route::put("modelodocumento/atualizar/{id}","ModeloDocumentoController@update");
    Route::get("modelodocumento/buscar/{id}","ModeloDocumentoController@show");
    Route::get("modelodocumento/listar","ModeloDocumentoController@index");
    Route::get("modelodocumento/getDocumentoContrato/{id}/{idContrato}", "ModeloDocumentoController@getDocumentoContrato");
    Route::delete("modelodocumento/excluir/{id}","ModeloDocumentoController@destroy");

    Route::get("parcela/listParcelas/","ParcelaController@index");
    Route::get("parcela/getByContrato/{id}","ParcelaController@getByContrato");
    Route::get("parcela/getById/{id}","ParcelaController@show");
    Route::delete("parcela/excluir/{id}","ParcelaController@destroy");
    Route::put("parcela/atualizar/{id}","ParcelaController@update");
    Route::get("parcela/getParcelas/{id}","ParcelaController@getParcelas");
    Route::get("parcela/gerarParcelas/{id}","ParcelaController@gerarParcelas");
    Route::get("parcela/gerarBoleto","ParcelaController@gerarBoleto");

    Route::get("parcelaitem/getByParcela/{id}","ParcelaItemController@getByParcela");
    Route::delete("parcelaitem/excluir/{id}","ParcelaItemController@destroy");

    Route::post("documento/cadastrar","DocumentoContratoController@store");
    Route::put("documento/atualizar/{id}","DocumentoContratoController@update");
    Route::get("documento/listar","DocumentoContratoController@index");

    Route::post("usuario/cadastrar","UserController@store");
    Route::put("usuario/atualizar/{id}","UserController@update");
    Route::get("usuario/listar","UserController@index");

    Route::get("tipoimovel/listar","TipoImovelController@index");
    Route::get("tipoimovel/getById/{id}","TipoImovelController@show");
    Route::post("tipoimovel/cadastrar","TipoImovelController@store");
    Route::put("tipoimovel/atualizar/{id}","TipoImovelController@update");
    Route::delete("tipoimovel/excluir/{id}","TipoImovelController@destroy");

    Route::get("planoconta/listar","PlanoContaController@index");
    Route::get("planoconta/getById/{id}","PlanoContaController@show");
    Route::post("planoconta/cadastrar","PlanoContaController@store");
    Route::put("planoconta/atualizar/{id}","PlanoContaController@update");
    Route::delete("planoconta/excluir/{id}","PlanoContaController@destroy");
    Route::get("planoconta/getByTipoConta/{idTipoConta}","PlanoContaController@getByTipoConta");

    Route::get("item/listar","ItemController@index");
    Route::get("item/getById/{id}","ItemController@show");
    Route::post("item/cadastrar","ItemController@store");
    Route::put("item/atualizar/{id}","ItemController@update");
    Route::delete("item/excluir/{id}","ItemController@destroy");

    Route::get("formapagamento/listar","FormaPagamentoController@index");
    Route::get("formapagamento/getById/{id}","FormaPagamentoController@show");
    Route::post("formapagamento/cadastrar","FormaPagamentoController@store");
    Route::put("formapagamento/atualizar/{id}","FormaPagamentoController@update");
    Route::delete("formapagamento/excluir/{id}","FormaPagamentoController@destroy");

    Route::get("tipostatus/listar","TipoStatusController@index");
    Route::get("tipopessoa/listar","TipoPessoaController@index");
    Route::get("tipopagamento/listar","TipoPagamentoController@index");
    Route::get("tipodocumentocontrato/listar","TipoDocumentoContratoController@index");
    Route::get("tipocontrato/listar","TipoContratoController@index");
    Route::get("tipoconta/listar","TipoContaController@index");
    Route::get("status/listar","StatusController@index");
    Route::get("mes/listar","MesController@index");
    Route::get("estadocivil/listar","EstadoCivilController@index");

});
