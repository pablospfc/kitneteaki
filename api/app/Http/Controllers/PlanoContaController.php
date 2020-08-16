<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PlanoContaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $user;

    function __construct()
    {
        $this->user = auth('api')->user();
    }

    public function index()
    {
        try {
            $dados = \App\Model\PlanoConta::join("tipo_conta", "plano_conta.id_tipo_conta", "=", "tipo_conta.id")
            ->select("plano_conta.*", "tipo_conta.nome as tipo")
                ->when($this->user['id_perfil'] != 1, function ($query) {
                    return $query->where('plano_conta.token', $this->user['token']);
                })
            ->get();
            return response()->json($dados, 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(["message" => $e->getMessage()]);
            return response()->json(["message" => "Ocorreu um problema ao carregar dados."]);
        }
    }

    public function getByTipoConta($idTipoConta)
    {
        try {
            $dados = \App\Model\PlanoConta::where("id_tipo_conta", $idTipoConta)
                ->when($this->user['id_perfil'] != 1, function ($query) {
                    return $query->where('plano_conta.token', $this->user['token']);
                })
                ->get();
            return response()->json($dados, 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao listar Plano de Contas.' . $e->getMessage()], 500);
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            \App\Model\PlanoConta::create($request->all());
            return response()->json(['message' => 'Dados cadastrados com sucesso.'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao cadastrar dados. Por favor, tente novamente'], 500);
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
            $data = \App\Model\PlanoConta::find($id);
            return response()->json($data, 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao carregar dados. Por favor, tente novamente'], 500);
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
            \App\Model\PlanoConta::where('id', $id)
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            \App\Model\PlanoConta::destroy($id);
            return response()->json(['message' => 'Dado excluído com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao excluir dados. Por favor tente novamente'], 500);
        }
    }
}
