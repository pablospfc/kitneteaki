<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        //return parent::render($request, $exception);
        $exception = $this->prepareException($exception);

        if ($exception instanceof \Illuminate\Http\Exception\HttpResponseException) {
            return $exception->getResponse();
        }
        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            return $this->unauthenticated($request, $exception);
        }
        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            return $this->convertValidationExceptionToResponse($exception, $request);
        }

        if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json(['token_expired'], $exception->getStatusCode());
        } else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
            return response()->json(['token_invalid'], $exception->getStatusCode());
        }else if ($exception instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
            return response()->json(['error' => $exception->getMessage()], $exception->getStatusCode());
        }
        else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){
            return response()->json(['error' => 'token_has_been_blacklisted'], $exception->getStatusCode());
        }

        $response = [];

        $statusCode = 500;
        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        }

        switch ($statusCode) {
            case 404:
                $response['error'] = 'Not Found';
                break;

            case 403:
                $response['error'] = 'Forbidden';
                break;

            default:
                $response['error'] = $exception->getMessage();
                break;
        }

        if (config('app.debug')) {
            $response['trace'] = $exception->getTrace();
            $response['code'] = $exception->getCode();
        }

        return response()->json($response, $statusCode);
    }
}
