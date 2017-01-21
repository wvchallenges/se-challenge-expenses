<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    /**
     * Model fillable fields
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];
}
