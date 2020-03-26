<?php


namespace App\Http\Controllers;


use App\Model\Boleto;

class BoletoController extends Controller
{
    private $boleto;

    function __construct()
    {
        $this->boleto = new Boleto();
    }

    public function gerarBoleto()
    {
        return $this->boleto->gerarBoleto();
    }

}