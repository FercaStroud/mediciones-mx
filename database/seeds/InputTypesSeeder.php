<?php

use Illuminate\Database\Seeder;

class InputTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = ['select', 'textarea'];

        foreach ($types as $type) {
            DB::table('input_types')->insert([
                'name' => $type,
            ]);
        }
    }
}
