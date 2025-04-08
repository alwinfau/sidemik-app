<?php

use App\Http\Controllers;
use App\Http\Controllers\StudyProgram;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman utama
Route::get('/', Controllers\DashboardController::class)->middleware(['auth','verified'])->name('home');

// Route dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Resource Study Program
Route::resource('/study-program', StudyProgram::class);

// Route Fakultas
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/fakultas', function () {
        return Inertia::render('Fakultas/Faculty');
    })->name('Fakultas');
});

// Route Class
Route::get('/class', function () {
    return Inertia::render('Class/index');
})->name('class');

// University Profile
Route::resource('resources/university-profile', Controllers\UniversityProfileController::class)->names([
    'resources/university-profile' => 'university-profile',
]);

// Route Academic Period
Route::get('/AcademicPeriod', function() {
    return Inertia::render('AcademicPeriod/AcademicPeriod');
})->name('AcademicPeriod');

// Tambahan route file
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require_once __DIR__.'/dev.php';
