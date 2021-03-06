<?php

namespace App\Http\Controllers;

use App\Model\Contrato;
use http\Env\Response;
use http\Exception;
use Illuminate\Http\Request;

class ContratoController extends Controller
{

    private $contrato;

    function __construct()
    {
        $this->contrato = new Contrato();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $dados = $this->contrato->getAll($request->all());
            return response()->json($dados, 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao listar dados'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $id = $this->contrato->salvar($request->all());
            return response()->json(['message' => 'Dados cadastrados com sucesso.', 'id' => $id], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao cadastrar dados. Por favor, tente novamente'], 500);
        }
    }

    public function renovar(Request $request) {
        try {
            $id = $this->contrato->renovarContrato($request->all());
            return response()->json(['message' => 'Contrato prorrogado com sucesso.', 'id' => $id],200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema na prorrogação de contrato.'],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $data = \App\Model\Contrato::find($id);
                return response()->json($data);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao buscar dado.']);
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            \App\Model\Contrato::where("id", $id)
                ->update($request->all());
            return response()->json(['message' => 'Atualizado com sucesso'], 200);
        }catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao atualizar dados. Por favor tente novamente.'], 200);
        }
    }

    public function concluir(Request $request, $id) {
        try {
            \App\Model\Contrato::where('id', $id)
                ->update($request->all());
            return response()->json(['message' => 'O contrato foi concluído com sucesso.'],200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao concluir cadastro de contrato.'],500);
        }
    }

    public function setDocumentoContrato(Request $request, $id) {
        try {
            \App\Model\Contrato::where('id', $id)
                ->update($request->all());
            return response()->json(['message' => 'O documento de contrato foi atualizado com sucesso.'],200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao atualizar documento de contrato.'],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $this->contrato->remover($id);
            return response()->json(['message' => 'Contrato excluído com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao excluir dados. Por favor tente novamente'], 500);
        }
    }
}
