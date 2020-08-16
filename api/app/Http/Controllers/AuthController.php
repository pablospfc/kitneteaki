<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('login', 'password');
            // attempt to verify the credentials and create a token for the user
            if (! $token = auth('api')->attempt($credentials)) {
                return response()->json(['error' => 'Não foi possível entrar no sistema. Seus dados estão incorretos.'], 401);
            }

            $user = auth('api')->user();

            if ($user['ativo'] == false){
                return response()->json(['error' => 'Você não está habilitado para acessar o sistema.'], 401);
            }

        return $this->respondWithToken($token, $user);

    }

    public function refresh() {
        return $this->respondWithToken(auth()->refresh());
    }

    public function logout() {
        auth('api')->logout();
        return response()->json(['logout']);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    protected function respondWithToken($token, $user = false)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'user'       => $user,
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
