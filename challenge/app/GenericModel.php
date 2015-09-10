<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;

class GenericModel extends Model {
    protected $errors;

    public function __construct() {
        $this->errors = null;
    }

    public function validate($content, array $rules, Validator $validator = null) {
        if($validator === null)
            $validator = Validator::make($content, $rules);

        if ($validator->fails())
        {
            $this->errors = $validator->errors()->all();
            return false;
        }

        $this->errors = null;
        return true;
    }

    public function getErrors() {
        return $this->errors;
    }
} 