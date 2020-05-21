<?php

namespace App\Http\Controllers;

use App\Model\Boleto;
use App\Model\Parcela;
use Illuminate\Http\Request;
use Mockery\Exception;

class ParcelaController extends Controller
{
    private $parcela;
    private $boleto;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->parcela = new Parcela();
        $this->boleto = new Boleto();
    }

    public function index(Request $request)
    {
        try {
            $dados = $this->parcela->listParcelas($request->all());
            return response()->json($dados,200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao listar dados'],500);
        }
    }

    public function getByContrato($id) {
        try {
            $dados = $this->parcela->getByContrato($id);
            return response()->json($dados,200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao listar fatura'],500);
        }
    }

    public function gerarBoleto()
    {
        return json_encode($this->boleto->gerarBoleto());
    }

    public function gerarParcelas($id) {
        try {
            $this->parcela->gerarParcelas($id);
            return response()->json(['message' => 'A fatura foi gerada com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao gerar fatura.'], 500);
        }
    }

    public function getParcelas($idContrato) {
        try {
            $dados = $this->parcela->getParcelas($idContrato);
            return response()->json($dados, 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao carregar dados da fatura.'], 500);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $dado = \App\Model\Parcela::find($id);
            return response()->json($dado,200);
        }catch(\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um problema ao carregar dados'],500);
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $this->parcela->updateParcela($request->all(), $id);
            return response()->json(['message' => 'Dado atualizado com sucesso.'],200);
        }catch(\Exception $e) {
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
        try {
            \App\Model\Parcela::destroy($id);
            return response()->json(['message' => 'Dado excluído com sucesso'], 200);
        } catch (\Exception $e) {
            \App\Model\Log::create(['message' => $e->getMessage()]);
            return response()->json(['message' => 'Ocorreu um erro ao excluir dados. Por favor tente novamente'], 500);
        }
    }
}
