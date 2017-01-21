<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('employee_id')->unsigned();
            $table->integer('expense_category_id')->unsigned();
            $table->integer('tax_type_id')->unsigned();
            $table->string('description');
            $table->double('pre_tax_amount', 10, 2);
            $table->double('tax_amount', 10, 2)->unsigned();
            $table->date('date');
            $table->timestamps();

            $table->foreign('tax_type_id')->references('id')->on('tax_types');
            $table->foreign('employee_id')->references('id')->on('employees');
            $table->foreign('expense_category_id')->references('id')->on('expense_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}
