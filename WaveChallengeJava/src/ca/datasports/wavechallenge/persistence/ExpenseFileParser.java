package ca.datasports.wavechallenge.persistence;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import ca.datasports.wavechallenge.data.Employee;
import ca.datasports.wavechallenge.data.Expense;
import ca.datasports.wavechallenge.data.ExpenseCategory;
import ca.datasports.wavechallenge.data.ExpenseReport;
import ca.datasports.wavechallenge.data.TaxName;

public class ExpenseFileParser {

	public ExpenseReport parseFromFileName(ExpenseReport report, String fileName) throws FileNotFoundException, IOException, ParseException
	{
		return initFromReader(report, new FileReader(fileName));	
	}
	
	public ExpenseReport parseFromFileContents(ExpenseReport report, String fileContents) throws IOException, ParseException
	{
		return initFromReader(report, new StringReader(fileContents));
	}

	private SimpleDateFormat _dateFormat = new SimpleDateFormat("MM/dd/yyyy");
	private NumberFormat _numberFormat = NumberFormat.getInstance();
	
	private static class ReportHeaders 
	{
		static final String date = "date";
		static final String category = "category";
		static final String employeeName = "employee name";
		static final String employeeAddress = "employee address";
		static final String expenseDescription = "expense description";
		static final String preTaxAmount = "pre-tax amount";
		static final String taxName = "tax name";
		static final String taxAmount = "tax amount";
	}

	private ExpenseReport initFromReader(ExpenseReport report, Reader reader) throws IOException, ParseException
	{
		Iterable<CSVRecord> expenseRecords = CSVFormat.RFC4180.withFirstRecordAsHeader().parse(reader);
		
		for (CSVRecord curExpenseRecord : expenseRecords)
		{
			Employee curEmployee = report.registerEmployee(parseEmployee(curExpenseRecord));
			ExpenseCategory curExpenseType = report.registerCategory(parseCategory(curExpenseRecord));
			TaxName curTaxName = report.registerTaxName(parseTaxName(curExpenseRecord));
			
			report.addExpense(parseExpense(curExpenseRecord, curEmployee, curExpenseType, curTaxName));
		}
		
		return report;
	}
	
	private Employee parseEmployee(CSVRecord srcRecord)
	{
		String employeeName = srcRecord.get(ReportHeaders.employeeName).trim();
		String employeeAddress = srcRecord.get(ReportHeaders.employeeAddress).trim();
		
		return new Employee(employeeName, employeeAddress);
	}
	
	private ExpenseCategory parseCategory(CSVRecord srcRecord)
	{
		String category = srcRecord.get(ReportHeaders.category).trim();
		return new ExpenseCategory(category);
	}

	private TaxName parseTaxName(CSVRecord srcRecord)
	{
		String taxName = srcRecord.get(ReportHeaders.taxName).trim();
		
		return new TaxName(taxName);
	}
	
	private Expense parseExpense(CSVRecord srcRecord, Employee employee, ExpenseCategory category, TaxName taxName) throws ParseException
	{
		Date date = _dateFormat.parse(srcRecord.get(ReportHeaders.date).trim());
		String description = srcRecord.get(ReportHeaders.expenseDescription).trim();
		Double preTaxAmount = _numberFormat.parse(srcRecord.get(ReportHeaders.preTaxAmount).trim()).doubleValue();
		Double taxAmount = _numberFormat.parse(srcRecord.get(ReportHeaders.taxAmount).trim()).doubleValue();
		
		return new Expense(date, description, preTaxAmount, taxAmount, employee, category, taxName);
	}
	
}
