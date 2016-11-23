<?php

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
            $table->longText('expense_description');
            $table->date('date');
            $table->text('category');
            $table->string('employee_name', 128);
            $table->string('employee_address', 256);
            $table->decimal('pre-tax_amount', 9, 2);
            $table->decimal('tax_amount', 9, 2);
            $table->string('tax_name', 64);
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
        Schema::drop('expenses');
    }
}
