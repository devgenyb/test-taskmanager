<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiJsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // я не могу накинуть ее на /api/ потому что на роуте уже есть мидлваре, если успею разберусь
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
