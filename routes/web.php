<?php

use App\Http\Controllers;
use App\Http\Controllers\StudyProgram;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('welcome');
//})->name('home');

Route::get('/', Controllers\DashboardController::class)->middleware(['auth','verified'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::resource('/study-program', StudyProgram::class);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/fakultas', function () {
        return Inertia::render('Fakultas/Faculty');
    })->name('Fakultas');
});
Route::get('/class', function () {
    return Inertia::render('Class/index');
})->name('class');


Route::resource('resources/university-profile', Controllers\UniversityProfileController::class)->names([
    'resources/university-profile' => 'university-profile',
]);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require_once __DIR__.'/dev.php';
