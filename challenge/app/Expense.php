<?php namespace App;

class Expense extends GenericModel
{
    public static $validator;
    protected $validationRules = [
        'expense_description' => 'sometimes|string',
        'tax_name' => 'required|string|between:1,64',
        'tax_amount' => 'required|regex:/[\d]+(,)?(\.[\d]{2})?/',
        'pre-tax_amount' => 'required|regex:/[\d]+(,)?(\.[\d]{2})?/',
        'employee_address' => 'sometimes|string|between:1,256',
        'employee_name' => 'required|string|between:1,128',
        'category' => 'required|string',
        'date' => 'required|date'
    ];

    protected $table = 'expenses';
    protected $fillable = ['expense_description',
        'tax_name', 'tax_amount', 'date', 'category',
        'pre-tax_amount', 'employee_name', 'employee_address'];

    public function validateExpense($content) {
        return parent::validate($content, $this->validationRules, Expense::$validator);
    }

    public function __construct() {
        parent::__construct();
    }
}
