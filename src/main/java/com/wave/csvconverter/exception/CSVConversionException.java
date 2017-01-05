package com.wave.csvconverter.exception;

/*
 * Application customized base exception object
 */
public class CSVConversionException extends RuntimeException {

	private static final long serialVersionUID = 2588062449284656665L;

	public CSVConversionException(String message) {
		super(message);
	}

	public CSVConversionException(String message, Throwable cause) {
		super(message, cause);
	}
}
