<?php

namespace App\Http\Controllers;

use App\Imovel;
use App\Log;
use Illuminate\Http\Request;

class ImovelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $imovel;

    function __construct()
    {
        $this->imovel = new Imovel();
    }
    public function index()
    {
        try {
            $data = $this->imovel->getAll();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            Log::create(['message' => $e->getMessage()], 500);
            return response()->json(['message' => 'Ocorreu um problema ao listar dados.'],500);
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
        try{
            \App\Imovel::create($request->all());
            return response()->json(['message'=>"Dados inseridos com sucesso."],200);
        }catch(\Exception $e){
            \App\Log::create(['message'=> $e->getMessage()] );
            return response()->json(['message'=>"Ocorreu um erro ao cadastrar dados. Por favor tente novamente"],500);
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
        $data = \App\Imovel::find($id);

        return response()->json($data, 200);
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
            \App\Imovel::where('id', $id)
                ->update($request->all());
            return response()->json(['message' => 'Dados atualizados com sucesso.'], 200);
        } catch (\Exception $e) {
            Log::create(['message'=>$e->getMessage()]);
            return response()->json(['message'=> 'Ocorreu um problema ao atualizar dados. Por favor tente novamente.'],500);
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
