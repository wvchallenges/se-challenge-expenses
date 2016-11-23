package ca.datasports.wavechallenge.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;

import ca.datasports.wavechallenge.data.Employee;
import ca.datasports.wavechallenge.data.ExpenseCategory;
import ca.datasports.wavechallenge.data.ExpenseProperties;
import ca.datasports.wavechallenge.data.ExpenseReport;
import ca.datasports.wavechallenge.data.TaxName;
import ca.datasports.wavechallenge.persistence.DBSchema.EmployeeFields;
import ca.datasports.wavechallenge.persistence.DBSchema.ExpenseCategoryFields;
import ca.datasports.wavechallenge.persistence.DBSchema.ExpenseFields;
import ca.datasports.wavechallenge.persistence.DBSchema.TaxNamesFields;

public class DBReader {
	
	DBSchema _schema;
	
	public DBReader(DBSchema schema)
	{
		_schema = schema;
	}
	
	public ExpenseReport fetchFromDB(ExpenseReport report) throws SQLException
	{
		report = processEmployeeResults(report, _schema.GetEmployeesStmt.executeQuery());
		report = processExpenseCategoryResults(report, _schema.GetExpenseCategoriesStmt.executeQuery());
		report = processTaxNameResults(report, _schema.GetTaxNamesStmt.executeQuery());
		report = processExpenseResults(report, _schema.GetExpensesStmt.executeQuery());
		
		return report;
	}

	private ExpenseReport processExpenseResults(ExpenseReport report, ResultSet rsExpenses) throws SQLException {
		while (rsExpenses.next())
		{
			report.addExpensePropsWithLookup(
				new ExpenseProperties(
					rsExpenses.getDate(ExpenseFields.date.name()), 
					rsExpenses.getString(ExpenseFields.description.name()), 
					rsExpenses.getDouble(ExpenseFields.pretaxamount.name()), 
					rsExpenses.getDouble(ExpenseFields.taxamount.name())
				),
				rsExpenses.getInt(ExpenseFields.id.name()),
				rsExpenses.getInt(ExpenseFields.employeeid.name()),
				rsExpenses.getInt(ExpenseFields.categoryid.name()),
				rsExpenses.getInt(ExpenseFields.taxnameid.name())
			);
		}
		return report;
	}
	
	private ExpenseReport processTaxNameResults(ExpenseReport report, ResultSet rsTaxNames) throws SQLException {
		while (rsTaxNames.next())
		{
			report.registerTaxName(new TaxName(
				rsTaxNames.getInt(TaxNamesFields.id.name()),
				rsTaxNames.getString(TaxNamesFields.tax_name.name()))
			);
		}
		return report;
	}

	private ExpenseReport processExpenseCategoryResults(ExpenseReport report, ResultSet rsCategories) throws SQLException 
	{
		while (rsCategories.next())
		{
			report.registerCategory(new ExpenseCategory(
				rsCategories.getInt(ExpenseCategoryFields.id.name()),
				rsCategories.getString(ExpenseCategoryFields.category_name.name()))
			);
		}
		return report;
	}

	private ExpenseReport processEmployeeResults(ExpenseReport report, ResultSet rsEmployees) throws SQLException
	{
		while (rsEmployees.next())
		{
			report.registerEmployee(new Employee(
				rsEmployees.getInt(EmployeeFields.id.name()), 
				rsEmployees.getString(EmployeeFields.name.name()), 
				rsEmployees.getString(EmployeeFields.address.name()))
			);
		}
		
		return report;
	}
	
	

}
