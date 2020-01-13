<?php

namespace App\Http\Controllers;

use App\Model\ItemContrato;
use Illuminate\Http\Request;
use Mockery\Exception;

class ItemContratoController extends Controller
{
    private $itemContrato;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->itemContrato = new ItemContrato();
    }

    public function index()
    {
        //
    }

    public function getByContrato($id) {
        try {
            $dado = $this->itemContrato->getByContrato($id);
            return response()->json($dado,200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao listar itens.'],500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            \App\Model\ItemContrato::create($request->all());
            return response()->json(['message' => 'Dado inserido com sucesso'],200);
        }catch(Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Erro ao inserir dado'],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            \App\Model\ItemContrato::destroy($id);
            return response()->json(['message' => 'Dado excluído com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao excluir dados. Por favor tente novamente'], 500);
        }
    }
}
