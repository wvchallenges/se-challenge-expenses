package com.waveapps.sechallenge.dataReader;

import org.springframework.stereotype.Component;

@Component
public class DataReaderFactory {
	
	public DataReader<?> getInstance(DataReaderTypes type) {
		switch(type) {
			case CSV_EXPENSE: return new CSVExpensesDataReader();
			default: return null;
		}
	}
	
}
