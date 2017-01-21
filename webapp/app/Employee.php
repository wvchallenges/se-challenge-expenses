<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Employee Model
 *
 * @package App
 */
class Employee extends Model
{
    /**
     * Model fillable fields
     *
     * @var array
     */
    protected $fillable = [
        'name', 'address'
    ];
}
