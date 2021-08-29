<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'info@appsgorilasonline.com',
            'password' => bcrypt('admin'),
            'type_id' => 1,
        ]);

        User::create([
            'name' => 'Normal',
            'email' => 'normal@example.com',
            'password' => bcrypt('normal'),
            'type_id' => 2,
        ]);


    }
}
