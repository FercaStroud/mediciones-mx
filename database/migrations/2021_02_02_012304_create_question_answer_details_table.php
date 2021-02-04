<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionAnswerDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_answer_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('token', 30)->nullable();
            $table->string('lat', 20)->nullable();
            $table->string('long', 20)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('device', 100)->nullable();
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
        Schema::dropIfExists('question_answer_details');
    }
}
