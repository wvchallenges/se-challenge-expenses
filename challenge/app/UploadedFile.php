<?php namespace App;

class UploadedFile extends GenericModel
{
    public static $validator;
    protected static $validationRules = [
        'original_name' => 'required|max:128',
        'size' => 'required|integer',
        'extension' => 'required|in:csv|max:128'
    ];

    protected $table = 'uploaded_files';
    protected $fillable = ['original_name', 'size', 'extension'];

    public function validateFile($content) {
        return parent::validate($content, UploadedFile::$validationRules, UploadedFile::$validator);
    }

    public function __construct() {
        parent::__construct();
    }
}
