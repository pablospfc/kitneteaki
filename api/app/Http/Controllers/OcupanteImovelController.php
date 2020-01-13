<?php

namespace App\Http\Controllers;

use App\Model\Imovel;
use App\Model\OcupantesImovel;
use Illuminate\Http\Request;

class OcupanteImovelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $ocupante;

    function __construct()
    {
        $this->ocupante = new OcupantesImovel();
    }

    public function index()
    {
        try {
            $data = $this->ocupante->getAll();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocorreu um problema ao listar dados'], 500);
        }
    }

    public function getByContrato($id)
    {
        try {
            $data = \App\Model\OcupantesImovel::where('id_contrato', $id)
                ->get();
            return response()->json($data, 200);
        } catch (\Exception $e) {
           \App\Model\Log::create(['message' => $e->getMessage()]);
           return response()->json(['message' => 'Ocorreu um problema ao listar dados. Por favor tente novamente'], 500);
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
            \App\Model\OcupantesImovel::create($request->all());
            return response()->json(['message' => 'Dados cadastrados com sucesso!'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao cadastrar dados. Por favor, tente novamente'], 500);
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
            $dado  =  \App\Model\OcupantesImovel::find($id);
            return response()->json($dado,200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao carregar os dados.'], 500);
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
            \App\Model\Pessoa::where('id', $id)
                ->update($request->all());
            return response()->json(['message' => 'Dados atualizados com sucesso.'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao atualizar dados. Por favor tente novamente'], 200);
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
            \App\Model\OcupantesImovel::destroy($id);
            return response()->json(['message' => 'Dado excluído com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao excluir dados. Por favor tente novamente'], 500);
        }
    }
}
