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

    Route::post("imovel/cadastrar","ImovelController@store");
    Route::put("imovel/atualizar/{id}","ImovelController@update");
    Route::get("imovel/listar","ImovelController@index");
    Route::get("imovel/buscar/{id}","ImovelController@show");
    Route::get("imovel/getByTransacao/{id}","ImovelController@getByTransacao");


    Route::post("ocupante/cadastrar","OcupanteImovelController@store");
    Route::put("ocupante/atualizar/{id}","OcupanteImovelController@update");
    Route::get("ocupante/listar","OcupanteImovelController@index");
    Route::get("ocupante/buscar/{id}","OcupanteImovelController@show");

    Route::post("conta/cadastrar","ContaController@store");
    Route::put("conta/atualizar/{id}","ContaController@update");
    Route::get("conta/listar","ContaController@index");

    Route::post("contrato/cadastrar","ContratoController@store");
    Route::put("contrato/atualizar/{id}","ContratoController@update");
    Route::get("contrato/listar","ContratoController@index");

    Route::post("documento/cadastrar","DocumentoContratoController@store");
    Route::put("documento/atualizar/{id}","DocumentoContratoController@update");
    Route::get("documento/listar","DocumentoContratoController@index");

    Route::post("usuario/cadastrar","UserController@store");
    Route::put("usuario/atualizar/{id}","UserController@update");
    Route::get("usuario/listar","UserController@index");



    Route::get("tipostatus/listar","TipoStatusController@index");
    Route::get("tipopessoa/listar","TipoPessoaController@index");
    Route::get("tipopagamento/listar","TipoPagamentoController@index");
    Route::get("tipoimovel/listar","TipoImovelController@index");
    Route::get("tipodocumentocontrato/listar","TipoDocumentoContratoController@index");
    Route::get("tipocontrato/listar","TipoContratoController@index");
    Route::get("tipoconta/listar","TipoContaController@index");
    Route::get("status/listar","StatusController@index");
    Route::get("mes/listar","MesController@index");
    Route::get("estadocivil/listar","EstadoCivilController@index");
});
