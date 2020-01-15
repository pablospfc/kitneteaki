<?php

namespace App\Http\Controllers;

use App\Model\FiadorContrato;
use Illuminate\Http\Request;

class FiadorController extends Controller
{
    private $fiador;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->fiador = new FiadorContrato();
    }

    public function index()
    {
        //
    }

    public function getByContrato($id)
    {
        try {
            $data = $this->fiador->getByContrato($id);
            return response()->json($data, 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Não foi possível listar testemunhas']);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            \App\Model\FiadorContrato::create($request->all());
            return response()->json(['message' => 'Dados inseridos com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao inserir dados. Por favor tente novamente.'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $dado = \App\Model\FiadorContrato::find($id);
            return response()->json($dado, 200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Nãpo foi possível carregar os dados.'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            \App\Model\FiadorContrato::where('id', $id)
                ->update($request->all());
            return response()->json(['message' => 'Dados atualizados com sucesso'],200);
        }catch(\Exception $e) {
           \App\Model\Log::create(['message' => $e->getMessage()]);
           return response()->json(['message' => 'Não foi possível excluir este registro. Por favor tente novamente.'],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            \App\Model\FiadorContrato::destroy($id);
            return response()->json(['message' => 'Dado excluído com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao excluir dados. Por favor tente novamente'], 500);
        }
    }
}
