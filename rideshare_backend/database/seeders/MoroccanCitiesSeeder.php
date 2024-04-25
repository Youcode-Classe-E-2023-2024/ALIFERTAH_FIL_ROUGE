<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MoroccanCitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Array of Moroccan cities
        $cities = 
        [
            ['name' => 'Casablanca'],
            ['name' => 'Marrakech'],
            ['name' => 'Fes']
        ];

        DB::table('moroccan_cities')->insert($cities);

    }
}
