<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * ExpenseCategory Model
 *
 * @package App
 */
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
