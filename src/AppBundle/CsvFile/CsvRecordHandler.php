<?php
namespace AppBundle\CsvFile;

/**
 * 
 * CSV Record Handler interface required for the CsvFileReader class
 * 
 */
interface CsvRecordHandler 
{	
    /**
     * 
     * Enter description here ...
     * @param string $column
     * @param string $header
     * @param array $row
     */
    public function columnFilterHandler(&$column, $header, $row);
    
    /**
     * 
     * Enter description here ...
     * @param string $column
     * @param string $header
     * @param array $row
     * 
     * @return mixed
     */
    public function columnValidatorHandler($column, $header, $row);
    
    /**
     * 
     * Enter description here ...
     * @param string $column
     * @param string $header
     * @param array $row
     */
    public function onColumnValidationError($column, $header, $row);
    
    /**
     * 
     * Enter description here ...
     * @param array $row
     */
    public function rowFilterHandler(&$row);
    
    /**
     * 
     * Enter description here ...
     * @param array $row
     * 
     * @return mixed
     */
    public function rowValidatorHandler($row);

    /**
     * 
     * Enter description here ...
     * @param array $row
     */
    public function onRowValidationError($row);
    
    /**
     * 
     * Enter description here ...
     * @param array $record
     */
    public function onRecordEvent($record);
    
    /**
     * 
     * Enter description here ...
     * @param int $line 
     * @param array $record
     * @param array $header
     * @param array $errors
     */
    public function onRecordError($record);
}