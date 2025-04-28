<?php

use App\Http\Controllers;
use App\Http\Controllers\StudyProgram;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckToken;
use GuzzleHttp\Psr7\Response;

    // Halaman utama
Route::get('/', Controllers\DashboardController::class)->middleware(['auth','verified'])->name('home');

// Route dashboard
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

// Resource Study Program
Route::resource('/study-program', StudyProgram::class);

// Route Fakultas
Route::get('/faculty', function () {
    return Inertia::render('Fakultas/Faculty');
})->name('Fakultas');

// Route Class
Route::get('/class', function () {
    return Inertia::render('Class/index');
})->name('class');

// University Profile
Route::resource('resources/university-profile', Controllers\UniversityProfileController::class)->names([
    'resources/university-profile' => 'university-profile',
]);

// Route Academic Period
Route::get('/academic-period', function() {
    return Inertia::render('AcademicPeriod/AcademicPeriod');
})->name('AcademicPeriod');

// Route Group Course
Route::get('/course-group', function () {
    return Inertia::render('CourseGroup/Index');
})->name('GroupCourse');

// Route Students
Route::get('/students', function () {
    return Inertia::render('Students/studentspage');
})->name('Students');

// Route Academic Year
Route::get('/academic-year', function() {
    return Inertia::render('AcademicYear/AcademicYear');
})->name('AcademicYear');

// Route Employee
Route::get('/employee', function() {
    return Inertia::render('Employees/Employees');
})->name('Employees');

// Route Employee Document
Route::get('/employee-document', function() {
    return Inertia::render('DocumentEmployee/EmployeeDocument');
})->name('EmployeeDocument');

// Route Accreditation Prodi
Route::get('/prodi-accreditation', function() {
    return Inertia::render('ProdiAccreditation/index');
})->name('prodi-accreditation');

// Route Document Type
Route::get('/document-type', function() {
    return Inertia::render('DocumentTypes/Document');
})->name('DocumentTypes');

// Route Active Status
Route::get('/active-status', function() {
    return Inertia::render('ActiveStatuses/ActiveStatus');
})->name('ActiveStatuses');

// Route Accreditation Agency
Route::get('/accreditation-agency', function() {
    return Inertia::render('AccreditationAgency/accreditationgencypages');
})->name('accreditaionagency');

// Route Final Project Type
Route::get('/final-project-type', function() {
    return Inertia::render('FinalProject/FinalProjectPage');
})->name('accreditaionagency');

// Route Course Type 
Route::get('/course-type', function() {
    return Inertia::render('CourseType/CourseTypePage');
})->name('CourseTypePage');

// Route Education Level 
Route::get('/education-level', function() {
    return Inertia::render('EducationLevel/index');
})->name('Index');

// Route Employee Relationship
Route::get('/employee-relationship', function() {
    return Inertia::render('EmploRelationship/EmploRelationship');
})->name('EmploRelationship');

// Route Academik Position  
Route::get('/academic-position', function() {
    return Inertia::render(component:'AcademicPosition/AcademicPosition');
})->name('AcademicPosition');

// Route Academic Position Types
Route::get('/academic-position-types', function() {
    return Inertia::render(component:'AcademicPostionTypes/AcademicPositionTypes');
})->name('AcademicPositionTypes');

// Route Province
Route::get('/province', function() {
    return Inertia::render(component:'Province/Province');
})->name('Province');

// Tambahan route file
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require_once __DIR__.'/dev.php';
