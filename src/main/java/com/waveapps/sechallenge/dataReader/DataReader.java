package com.waveapps.sechallenge.dataReader;

import java.util.ArrayList;
import java.util.List;

public abstract class DataReader<T> {

	private List<DataReaderWarning> warnings;
	
	public DataReader() {
		warnings = new ArrayList<DataReaderWarning>();
	}
	
	public abstract List<T> unmarshall(Object source) throws Exception;
	
	public void addWarning(DataReaderWarning warning) {
		warnings.add(warning);
	}
	
	public List<DataReaderWarning> getWarnings(){
		return warnings;
	}
	
}
