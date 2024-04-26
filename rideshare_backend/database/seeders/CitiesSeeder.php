<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        City::create(["name" => "Casablanca"]);
        City::create(["name" => "Marrakech"]);
        City::create(["name" => "Fes"]);
        City::create(["name" => "Tangier"]);
        City::create(["name" => "Agadir"]);
        City::create(["name" => "Rabat"]);
        City::create(["name" => "Oujda"]);
        City::create(["name" => "Kenitra"]);
        City::create(["name" => "Tetouan"]);
        City::create(["name" => "Safi"]);
        City::create(["name" => "Sale"]);
        City::create(["name" => "Mohammedia"]);
        City::create(["name" => "Khouribga"]);
        City::create(["name" => "El Jadida"]);
        City::create(["name" => "Temara"]);
        City::create(["name" => "Nador"]);
        City::create(["name" => "Larache"]);
        City::create(["name" => "Settat"]);
        City::create(["name" => "Taza"]);
        City::create(["name" => "Berkane"]);

    }
}
