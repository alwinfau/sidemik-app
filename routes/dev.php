<?php

use Illuminate\Support\Facades\Route;

if (app()->isLocal()){
    Route::get('dev/login/{id}', function ($id){
        auth()->loginUsingId($id);
        return redirect('dashboard');
    });
}
