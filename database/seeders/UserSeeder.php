<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            'superuser',
            'academic',
            'finance',
            'employee',
            'student',
            'security',
            'canteen'
        ])->each(function ($role): void {
            Role::create([
                'name' => $role
            ]);
        });

        collect([
            ['name' => 'alwin', "email" => 'alwin@gmail.com'],
            ['name' => 'andrey', 'email' => 'andreyt@gmail.com'],
            ['name' => 'indra', 'email' => 'indra@gmail.com'],
            ['name' => 'martha', 'email' => 'martha@gmail.com'],
            ['name' => 'farhan', 'email' => 'farhan@gmail.com'],
            ['name' => 'rizal', 'email' => 'rizal@gmail.com'],
            ['name' => 'christin', 'email' => 'christin@gmail.com'],
        ])->each(function ($user): void {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => bcrypt('password'),
            ]);
        });

        User::find(1)->assignRole('superuser');
        User::find(2)->assignRole('academic');
        User::find(3)->assignRole('finance');
        User::find(4)->assignRole('employee');
        User::find(5)->assignRole('student');
        User::find(6)->assignRole('security');
        User::find(7)->assignRole('canteen');

        User::factory(1000)->create();
    }
}
