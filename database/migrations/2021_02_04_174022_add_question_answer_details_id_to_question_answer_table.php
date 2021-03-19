<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddQuestionAnswerDetailsIdToQuestionAnswerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $driver = Schema::connection($this->getConnection())->getConnection()->getDriverName();

        Schema::table('question_answer', function (Blueprint $table) use ($driver) {
            if($driver === 'sqlite') {
                $table->unsignedBigInteger('question_answer_details_id')->default(0)->after('id');
            } else {
                $table->unsignedBigInteger('question_answer_details_id')->after('id');
            }

            $table->foreign('question_answer_details_id')->references('id')->on('question_answer_details');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('question_answer', function (Blueprint $table) {
            $table->dropForeign(['question_answer_details_id']);
            $table->dropColumn('question_answer_details_id');
        });
    }
}
