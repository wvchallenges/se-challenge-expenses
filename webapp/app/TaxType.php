<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * TaxType Model
 *
 * @package App
 */
class TaxType extends Model
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
