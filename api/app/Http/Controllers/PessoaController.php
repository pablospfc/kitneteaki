<?php

namespace App\Http\Controllers;

use App\Model\Pessoa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class PessoaController extends Controller
{
    private $pessoa;

    function __construct()
    {
        $this->pessoa = new Pessoa();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = $this->pessoa->getAll();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocorreu um problema ao listar dados'],500);
        }
    }

    public function getPessoas($idCategoriaPessoa){
        try{
            $data = \App\Model\Pessoa::where("id_categoria_pessoa", $idCategoriaPessoa)
                ->get();
            return response()->json($data, 200);
        } catch(\Exception $e) {
            return response()->json(['message' => 'Ocorreu um problema ao listar dados'],500);
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
            $response = \App\Model\Pessoa::create($request->all());
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
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = \App\Model\Pessoa::find($id);
            return response()->json($data, 200);
        } catch (\Exception $e) {
            throw new \Exception("Ocorreu um problema ao listar dados");
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
            \App\Model\Pessoa::destroy($id);
            return response()->json(['message' => 'Dado excluído com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao excluir dados. Por favor tente novamente'], 500);
        }
    }
}
