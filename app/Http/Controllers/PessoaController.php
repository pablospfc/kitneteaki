<?php

namespace App\Http\Controllers;

use App\Pessoa;
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
            $data = \App\Pessoa::all();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            throw new \Exception("Ocorreu um problema ao listar dados");
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
            $response = \App\Pessoa::create($request->all());
            return response()->json(['message' => 'Dados cadastrados com sucesso.'], 200);
        } catch (\Exception $e) {
            \App\Log::create($e);
            throw new \Exception("Ocorreu um erro ao salvar dados" . $e->getMessage());
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
        //
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
            \App\Pessoa::where('id', $id)
                ->update($request->all());
            return response()->json(['message' => 'Dados atualizados com sucesso.'], 200);
        } catch (\Exception $e) {
            throw new \Exception("Ocorreu um problema ao atualizar dados");
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
        //
    }
}
