package com.waveapps.sechallenge.dataReader;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import com.waveapps.sechallenge.model.Employee;
import com.waveapps.sechallenge.model.Expense;
import com.waveapps.sechallenge.model.ExpenseCategory;
import com.waveapps.sechallenge.model.Tax;

public class CSVExpensesDataReader<T> extends DataReader<Expense> {
	
	private SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
	private DecimalFormat numberFormat = new DecimalFormat("#,##0.##");
	private CSVFormat csvFormat = CSVFormat.EXCEL;
	
	public List<Expense> unmarshall(Object sourceFile) throws Exception {

		if(!(sourceFile instanceof MultipartFile)) {
			throw new Exception("The source object must be instance of org.springframework.web.multipart.MultipartFile!");
		}
		
		BufferedReader br = new BufferedReader(new InputStreamReader(((MultipartFile)sourceFile).getInputStream()));
		
		Map<String, Employee> employeeMap = new HashMap<String, Employee>();
		Map<String, ExpenseCategory> categoryMap = new HashMap<String, ExpenseCategory>();
		Map<String, Tax> taxMap = new HashMap<String, Tax>();
		
		List<Expense> expenses = new ArrayList<Expense>();
		
		int lineCounter = 0;
		
		Iterable<CSVRecord> records = csvFormat.parse(br);
		
		for(CSVRecord record : records) {
			lineCounter++;
			//discarding the first line, since it is always the header
			if(lineCounter != 1) {
				
				Expense ex = new Expense();
				ex.setDate(getDate(record.get(0), lineCounter));
				ex.setDescription(record.get(4));
				ex.setPreTaxAmount(getDouble(record.get(5), lineCounter));
				ex.setTaxAmount(getDouble(record.get(7), lineCounter));
				
				if(categoryMap.containsKey(record.get(1))) {
					ex.setCategory(categoryMap.get(record.get(1)));
				} else {
					ExpenseCategory ec = new ExpenseCategory(0, record.get(1));
					ex.setCategory(ec);
					categoryMap.put(ec.getDescription(), ec);
				}
				
				if(employeeMap.containsKey(record.get(2))) {
					ex.setEmployee(employeeMap.get(record.get(2)));
				} else {
					Employee em = new Employee(0, record.get(2), record.get(3), null);
					ex.setEmployee(em);
					employeeMap.put(em.getName(), em);
				}
				
				if(taxMap.containsKey(record.get(6))) {
					ex.setTax(taxMap.get(record.get(6)));
				} else {
					Tax t = new Tax(0, record.get(6));
					ex.setTax(t);
					taxMap.put(t.getName(), t);
				}
				
				expenses.add(ex);
			}
		}
				
		return expenses;
	}
	
	private Date getDate(String dateString, int lineNumber) {
		try {
			return dateFormat.parse(dateString);
		} catch (ParseException e) {
			DataReaderWarning warning = new CSVExpensesDataReaderWarning("The date '" + dateString + "' is not in the expected format '" + dateFormat.toPattern() + "'.", lineNumber);
			addWarning(warning);
			return null;
		}		
	}
	
	private double getDouble(String doubleString, int lineNumber) {
		try {
			return numberFormat.parse(doubleString.trim()).doubleValue();
		} catch (ParseException e) {
			DataReaderWarning warning = new CSVExpensesDataReaderWarning("The number '" + doubleString + "' is not in the expected format '" + numberFormat.toPattern() + "'.", lineNumber);
			addWarning(warning);
			return 0;
		}		
	}
	
}
