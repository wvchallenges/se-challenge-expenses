package com.wave.csvconverter.exception.upload;

import com.wave.csvconverter.exception.CSVConversionException;

/*
 * Custom exception object for the files upload and storage operations
 */
public class StorageException extends CSVConversionException {

	private static final long serialVersionUID = 6651010547266455529L;

	public StorageException(String message) {
		super(message);
	}

	public StorageException(String message, Throwable cause) {
		super(message, cause);
	}
}
