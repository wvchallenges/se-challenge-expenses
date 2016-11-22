<?php

namespace AppBundle\CsvFile;

/**
 *
 * Read CSV files.
 *
 *
 */
class CsvFileReader extends CsvFile
{
	private
	
	$errors = null,

	$currentRecordErrors = null,

	$currentColumnErrors = null,

	$currentLine = null;

	/**
	 * Class Constructor
	 *
	 * @param string $file
	 * @param boolean $hasHeader
	 * @param string $delimiter
	 * @param string $enclosure
	 * @param string $escape
	 *
	 * @throws CsvFileException
	 * @throws CsvFileEmptyException
	 * @throws CsvFileHeaderException
	 * @throws RuntimeException
	 */
	public function __construct($file, $hasHeader = true, $delimiter = ",", $enclosure = "\"", $escape = "\\")
	{
	    ini_set("auto_detect_line_endings", true);

	    // instantiate a file object of the file
	    try {
        	$this->fileObject = new \SplFileObject($file, "rb");
	    } 
	    catch (Exception $e) {
	    	throw new CsvFileException("File ({$file}) does not exist.");
	    }
        $this->fileObject->setFlags(\SplFileObject::SKIP_EMPTY | \SplFileObject::DROP_NEW_LINE);

        $this->delimiter = $delimiter;
        $this->enclosure = $enclosure;
        $this->escape = $escape;

        if ($this->fileObject->isReadable() === FALSE) {
            throw new CsvFileException("File ({$file}) is not readable.");
        }

        // check if the file is empty..
        if ($this->fileObject->eof()) {
        	// error
        	throw new CsvFileEmptyException("File ({$file}) is empty.");
        }

		if ($hasHeader) {
        	$this->rawHeader = $this->fileObject->fgetcsv($this->delimiter, $this->enclosure, $this->escape);

	        // check the file has a BOM and remove it from header
	        if( substr($this->fileObject->current(), 0, 3) == pack("CCC",0xef,0xbb,0xbf) ) {
	        	$bom = true;
	        }

        	// remove quotes as a result of bom header
        	if (isset($bom)) {
        		$this->rawHeader[0] = substr($this->rawHeader[0], 3); // remove bom bytes
        		$this->rawHeader[0] = str_replace($this->enclosure, '', $this->rawHeader[0]); // remove enclosure added by php fgetcsv
        	}
            $this->header = array_flip($this->rawHeader);

            // check header
            if (is_null($this->header)) {
            	// error
            	throw new CsvFileHeaderException("File ({$file}) header is null.");
            }
        }

        $this->currentColumnErrors = array();
        $this->currentRecordErrors = array();

        $this->errors = array(
                'file' => array(),
                'column' => $this->getCurrentColumnErrors(),
                'record' => $this->getCurrentRecordErrors());
	}

	/**
	 *
	 */
	public function __destruct()
	{
		unset($this->fileObject);
	}

    /**
     *
     * Return the file header
     * @return array column name => column position
     */
	public function getHeader()
	{
	    return $this->header;
	}

	public function getCurrentLine()
	{
		return $this->currentLine;
	}

	public function &getCurrentRecordErrors()
	{
		return $this->currentRecordErrors;
	}

	public function &getCurrentColumnErrors()
	{
		return $this->currentColumnErrors;
	}

	/**
	 *
	 * @return boolean
	 */
	public function hasErrors()
	{
	    return count($this->getCurrentColumnErrors()) + count($this->getCurrentRecordErrors()) > 0;
	}
	/**
	 *
	 * Iterate over the records in a CSV data file.
	 *
	 * @param CSVRecordHandler $handler
	 * @return int number of records unreadable
	 */
	public function execute(CSVRecordHandler $handler)
	{
	    // filter, validate and generate
	    $this->currentLine = 0;

	  	while ($this->fileObject->valid()) {

	    	$record = $this->fileObject->fgetcsv($this->delimiter, $this->enclosure, $this->escape);
	    	$this->currentLine++;

	    	if (empty($record)) {

	    	    $err = array("Record is unreadable.");

	    		// log the line number in the file that is unreadable ?
	    		$handler->onRecordError($this->currentLine, null, $this->getHeader(), $err);

	    		// $errors['file'][] = $err;
	    		continue;
	    	}

	    	// map the record to its header value
	    	if(!empty($this->rawHeader)){
	    		$record = array_combine($this->rawHeader, $record);
	    	}

    	    // row
	    	$handler->rowFilterHandler($record);

	    	$this->currentRecordErrors = array();
            $result = $handler->rowValidatorHandler($record);

            // row error ?
            if ($result !== true) {
                $handler->onRowValidationError($record);
               // $this->_errors['record'][] = $this->_current_record_errors;
                // continue;
            }

	    	// columns
	    	$record_valid = true;
	    	$this->currentColumnErrors = array();
	    	$orig = $record;
	    	foreach ($record as $header => $value) {
	    	    $handler->columnFilterHandler($value, $header, $orig);
	    	    $record[$header] = $value;

	    	    $result = $handler->columnValidatorHandler($value, $header, $orig);
	    	    if ($result !== true) {
	    	        $record_valid = false;
	    	        $handler->onColumnValidationError($value, $header, $orig);
	    	    }
	    	    $this->currentColumnErrors = array();
	    	}
	    	unset($orig);

	    	// were there any column validation errors ?
	    	if (!$record_valid) {
	    	    $handler->onRecordError($record);
	    	    // $this->_errors['column'][] = $this->_current_column_errors;
	    	    // continue;
	    	}

            // row is good..
            $handler->onRecordEvent($record);
	    	unset($record, $this->currentColumnErrors, $this->currentRecordErrors);
	    }

	    return $this->errors;
	}

	/**
	 * @return SplFileObject
	 */
	public function getFileObject()
	{
		return $this->fileObject;
	}
}