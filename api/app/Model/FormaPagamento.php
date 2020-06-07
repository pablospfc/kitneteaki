<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class FormaPagamento extends Model
{
    protected $table = "forma_pagamento";
    protected $primaryKey = "id";
    public $timestamps = true;
    protected $fillable = [
        "nome"
    ];

}
