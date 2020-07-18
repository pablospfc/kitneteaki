<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $dados = \App\Model\User::join("perfil", "users.id_perfil", "=", "perfil.id")
                ->join("pessoa", "users.id_pessoa", "=", "pessoa.id")
                ->select("perfil.nome as perfil", "users.*")
                ->get();
            return response()->json($dados,200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => "Ocorreu um problema ao listar dados."],500);
        }
    }

    public function desativar($id) {
        try {
            \App\Model\User::where("id", $id)
                ->where(['ativo' => false ]);
            return response()->json(['message' => 'Operação realizada com sucesso.'],200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao realizar operação'], 500);
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

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $dado = \App\Model\User::find($id);
            return response()->json($dado,200);
        } catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao exibir informações'],500);
        }
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $dados = $request->all();

            if (isset($dados['password'])) {
                $dados['password'] = bcrypt($dados['password']);
                unset($dados['confirm_password']);
                unset($dados['altera_senha']);
            }

            \App\Model\User::where("id", $id)
                ->update($dados);

            return response()->json(['message' => 'Usuário atualizado com sucesso'],200);

        }catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao atualizar dados.'],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
