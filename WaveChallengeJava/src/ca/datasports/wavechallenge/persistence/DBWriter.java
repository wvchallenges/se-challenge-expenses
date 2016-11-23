package ca.datasports.wavechallenge.persistence;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import ca.datasports.wavechallenge.data.DataEntityBase;
import ca.datasports.wavechallenge.data.Employee;
import ca.datasports.wavechallenge.data.Expense;
import ca.datasports.wavechallenge.data.ExpenseCategory;
import ca.datasports.wavechallenge.data.ExpenseReport;
import ca.datasports.wavechallenge.data.TaxName;
import ca.datasports.wavechallenge.persistence.DBSchema.EmployeeFields;
import ca.datasports.wavechallenge.persistence.DBSchema.ExpenseCategoryFields;
import ca.datasports.wavechallenge.persistence.DBSchema.ExpenseFields;
import ca.datasports.wavechallenge.persistence.DBSchema.MaxIDFields;
import ca.datasports.wavechallenge.persistence.DBSchema.TaxNamesFields;

public class DBWriter {
	private DBSchema _schema;
	
	private int _maxEmployeeId = DataEntityBase.NO_DB_ID;
	private int _maxCategoryId = DataEntityBase.NO_DB_ID;
	private int _maxTaxNameId = DataEntityBase.NO_DB_ID;
	private int _maxExpenseId = DataEntityBase.NO_DB_ID;

	public DBWriter(DBSchema schema)
	{
		_schema = schema;
	}
	
	public ExpenseReport commitToDb(ExpenseReport report) throws Exception
	{
		initMaxIDs();
		
		commitEmployees(report.getEmployees().getUncommitted(), _schema.StoreEmployeeStmt, _maxEmployeeId);
		commitCategories(report.getCategories().getUncommitted(), _schema.StoreCategoryStmt, _maxCategoryId);
		commitTaxNames(report.getTaxNames().getUncommitted(), _schema.StoreTaxNameStmt, _maxTaxNameId);
		commitExpenses(report.getUncommittedExpenses(), _schema.StoreExpenseStmt, _maxExpenseId);
		
		return report;
	}
	
	private void initMaxIDs() throws SQLException
	{
		ResultSet rsMaxIDs = _schema.GetMaxIDsStmt.executeQuery();
		
		if (rsMaxIDs.next())
		{
			_maxEmployeeId = rsMaxIDs.getInt(MaxIDFields.employeeMax.name());
			_maxCategoryId = rsMaxIDs.getInt(MaxIDFields.categoryMax.name());
			_maxTaxNameId = rsMaxIDs.getInt(MaxIDFields.taxMax.name());
			_maxExpenseId = rsMaxIDs.getInt(MaxIDFields.expenseMax.name());
		}
	}

	private void commitExpenses(List<Expense> expenses, PreparedStatement commitStmt, int startId) throws Exception
	{
		int curId = Math.max(startId +1, 1);
		
		for (Expense curExpense : expenses)
		{
			curExpense.setDbId(curId++);

			// id, categoryid, employeeid, taxnameid, date, description, pretaxamount, taxamount
			commitStmt.setInt(ExpenseFields.id.ordinal(), curExpense.getDbId());
			commitStmt.setInt(ExpenseFields.categoryid.ordinal(), curExpense.getExpenseCategory().getDbId());
			commitStmt.setInt(ExpenseFields.employeeid.ordinal(), curExpense.getEmployee().getDbId());
			commitStmt.setInt(ExpenseFields.taxnameid.ordinal(), curExpense.getTaxName().getDbId());
			commitStmt.setDate(ExpenseFields.date.ordinal(), new java.sql.Date(curExpense.getDate().getTime()));
			commitStmt.setString(ExpenseFields.description.ordinal(), curExpense.getDescription());
			commitStmt.setDouble(ExpenseFields.pretaxamount.ordinal(), curExpense.getPreTaxAmount());
			commitStmt.setDouble(ExpenseFields.taxamount.ordinal(), curExpense.getTaxAmount());
			
			commitStmt.addBatch();
		}
		
		int results[] = commitStmt.executeBatch();
		
		for (int curResult : results)
		{
			if (curResult == PreparedStatement.EXECUTE_FAILED)
			{
				throw new Exception("At least one insertion failed");
			}
		}
	}

	private void commitTaxNames(List<TaxName> taxNames, PreparedStatement commitStmt, int startId) throws Exception
	{
		int curId = Math.max(startId + 1, 1);

		for (TaxName curTaxName : taxNames)
		{
			curTaxName.setDbId(curId++);
			
			commitStmt.setInt(TaxNamesFields.id.ordinal(), curTaxName.getDbId());
			commitStmt.setString(TaxNamesFields.tax_name.ordinal(), curTaxName.getTaxName());
			
			commitStmt.addBatch();
		}
		
		int results[] = commitStmt.executeBatch();
		
		for (int curResult : results)
		{
			if (curResult == PreparedStatement.EXECUTE_FAILED)
			{
				throw new Exception("At least one insertion failed");
			}
		}
	}

	private void commitCategories(List<ExpenseCategory> categories, PreparedStatement commitStmt, int startId) throws Exception
	{
		int curId = Math.max(startId + 1, 1);
		
		for (ExpenseCategory curCategory : categories)
		{
			curCategory.setDbId(curId++);
			
			commitStmt.setInt(ExpenseCategoryFields.id.ordinal(), curCategory.getDbId());
			commitStmt.setString(ExpenseCategoryFields.category_name.ordinal(), curCategory.getCategory());
			
			commitStmt.addBatch();
		}
		
		int results[] = commitStmt.executeBatch();
		
		for (int curResult : results)
		{
			if (curResult == PreparedStatement.EXECUTE_FAILED)
			{
				throw new Exception("At least one insertion failed");
			}
		}
	}
	
	private void commitEmployees(List<Employee> employees, PreparedStatement commitStmt, int startId) throws Exception
	{
		int curId = Math.max(startId + 1, 1);
		
		for (Employee curEmployee : employees)
		{
			curEmployee.setDbId(curId++);
			
			commitStmt.setInt(EmployeeFields.id.ordinal(), curEmployee.getDbId());
			commitStmt.setString(EmployeeFields.name.ordinal(), curEmployee.getName());
			commitStmt.setString(EmployeeFields.address.ordinal(), curEmployee.getAddress());
			
			commitStmt.addBatch();
		}
		
		int results[] = commitStmt.executeBatch();
		
		for (int curResult : results)
		{
			if (curResult == PreparedStatement.EXECUTE_FAILED)
			{
				throw new Exception("At least one insertion failed");
			}
		}
	}
}
