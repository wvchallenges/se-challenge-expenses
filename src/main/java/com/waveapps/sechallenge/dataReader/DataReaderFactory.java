package com.waveapps.sechallenge.dataReader;

import org.springframework.stereotype.Component;

import com.waveapps.sechallenge.model.Expense;

@Component
public class DataReaderFactory {
	
	public DataReader<?> getInstance(DataReaderTypes type) {
		switch(type) {
			case CSV_EXPENSE: return new CSVExpensesDataReader<Expense>();
			default: return null;
		}
	}
	
}
