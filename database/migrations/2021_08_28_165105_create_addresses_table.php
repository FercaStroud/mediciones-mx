<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('street_name', 35);
            $table->string('street_number', 5);
            $table->string('street_number_int', 5)->nullable();
            $table->string('country', 35)->nullable();
            $table->string('state', 35)->nullable();
            $table->string('city', 35)->nullable();
            $table->string('zipcode', 10)->nullable();
            $table->text('other_details')->nullable();
            $table->boolean('primary')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
