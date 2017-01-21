<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    /**
     * Model fillable fields
     *
     * @var array
     */
    protected $fillable = [
        'employee_id', 'expense_category_id', 'description', 'pre_tax_amount', 'date', 'tax_type_id', 'tax_amount'
    ];
}
