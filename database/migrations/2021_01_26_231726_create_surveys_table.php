<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', 50);
            $table->string('slug', 50);
            $table->text('description')->nullable();
            $table->text('welcome_text')->nullable();
            $table->text('end_text')->nullable();
            $table->boolean('anonymized')->default(0);
            $table->boolean('active')->default(0);
            $table->datetime('starts_at')->nullable();
            $table->datetime('ends_at')->nullable();
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
        Schema::dropIfExists('surveys');
    }
}
