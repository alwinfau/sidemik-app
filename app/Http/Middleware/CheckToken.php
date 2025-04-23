<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

         if ($request->is('login')) {
            return $next($request);
        }
    
        $token = $request->cookie('token');

        logger('Token found:', [$token]);

        if (!$token || empty($token)) {
            return redirect('/login');
        }

        return $next($request);
    }
}
