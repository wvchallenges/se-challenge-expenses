package com.waveapps.sechallenge.dataReader;

public class CSVExpensesDataReaderWarning extends DataReaderWarning {

	public CSVExpensesDataReaderWarning(String description, int lineNumber) {
		super(description);
		this.lineNumber = lineNumber;
	}

	protected int lineNumber;

	public int getLineNumber() {
		return lineNumber;
	}

	public void setLineNumber(int lineNumber) {
		this.lineNumber = lineNumber;
	}
	
}
