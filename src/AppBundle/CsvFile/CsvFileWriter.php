<?php
namespace AppBundle\CsvFile;

/**
 * 
 * Write CSV files. 
 * 
 *
 */
class CsvFileWriter extends CsvFile
{	
    private $count = null;
    
    /**
     * 
     * @param array $options
     * @param string $file
     * @param array $header
     * @param string $delimiter
     * @param string $enclosure
     * @param string $escape
     * @param string $open_mode
     * @throws CsvFileException
     */
	public function __construct($options = [], $file = null, $header = array(), $delimiter = ",", $enclosure = "\"", $escape = "\\", $open_mode = "wb")
	{
		if (is_null($file)) {
			$file = tempnam(sys_get_temp_dir(), 'csv');
		}
		
	    // instantiate a file object of the file
        $this->fileObject = new \SplFileObject($file, $open_mode);
        
        $this->delimiter = $delimiter;
        $this->enclosure = $enclosure;
        $this->escape = $escape;
        
	    if ($this->fileObject->isWritable() === FALSE) {
            throw new CsvFileException("File ({$file}) is not writable.");
        }        
        
        // write the BOM header if told to do so.        
        if (isset($options['useBOM'])) {
        	$this->fileObject->fwrite(pack("CCC",0xEF,0xBB,0xBF));
        }
        
        if (!empty($header)) {
            $this->rawHeader = $header;
            $this->header = array_flip($this->rawHeader);
            
            // check header
            if (!is_null($this->header)) {       
                $this->fileObject->fputcsv($this->rawHeader, $this->delimiter, $this->enclosure, $this->escape);
            }
        }
        
        $this->count = 0;
	}
	
	public function __destruct()
	{
		// unlink($this->fileObject->getPathname());
	}
	
	/**
	 * Writes the given record to the file object
	 * 
	 * @param array $record
	 * @return boolean 
	 */
	public function write($record)
	{	    
	    // record needs to have its keys match the keys of the header otherwise we throw an excption
	    $this->count++;

	    return $this->fileObject->fputcsv($record, $this->delimiter, $this->enclosure, $this->escape);
	}
	
	/**
	 * 
	 * Iterate over the records writing them to a CSV data file.
	 * 
	 * @param array $records
	 * @return int number of records unwritable
	 */
	public function execute(array &$records)
	{    
	    $errors = 0;
	    
	    foreach ($records as $record) {
	        $result = $this->write($record);
	        if ($result === FALSE) $errors++; 
	    }

	    return $errors;
	}
	
	/**
	 * 
	 * @return number
	 */
	public function getCount()
	{		
		return $this->count;
	}
	
	/**
	 * 
	 * @return string
	 */
	public function getFilePath()
	{
		return $this->fileObject->getPathname();
	}
}