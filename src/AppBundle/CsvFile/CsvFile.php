<?php
namespace AppBundle\CsvFile;

abstract class CsvFile
{
    protected
    
	$fileObject = null,
	
	$delimiter = null,
	
	$enclosure = null,
	
	$escape = null,
	
	$header = null,
	
	$rawHeader = null;
}