package ca.datasports.wavechallenge.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DBSchema
{
	private static final String GetEmployees = "select * from employees";
	private static final String GetExpenseCategories = "select * from expensecategories";
	private static final String GetTaxNames = "select * from taxnames";
	private static final String GetExpenses = "select * from expenses";
	private static final String GetMaxIDs = "select (select max(id) from employees) as employeeMax, (select max(id) from expensecategories) as categoryMax, (select max(id) from taxnames) as taxMax, (select max(id) from expenses) as expenseMax;";
	
	private static final String StoreEmployee = "insert into employees (id, name, address) values (?, ?, ?);";
	private static final String StoreCategory = "insert into expensecategories (id, category_name) values (?, ?);";
	private static final String StoreTaxName = "insert into taxnames (id, tax_name) values (?, ?);";
	private static final String StoreExpense = "insert into expenses (id, categoryid, employeeid, taxnameid, date, description, pretaxamount, taxamount) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
	
	private Connection _dbConnection = null;
	
	public PreparedStatement GetEmployeesStmt = null;
	public PreparedStatement GetExpenseCategoriesStmt = null;
	public PreparedStatement GetTaxNamesStmt = null;
	public PreparedStatement GetExpensesStmt = null;
	public PreparedStatement GetMaxIDsStmt = null;

	public PreparedStatement StoreEmployeeStmt = null;
	public PreparedStatement StoreCategoryStmt = null;
	public PreparedStatement StoreTaxNameStmt = null;
	public PreparedStatement StoreExpenseStmt = null;
	
	public static enum MaxIDFields {DUMMY, employeeMax, categoryMax, taxMax, expenseMax};
	public static enum EmployeeFields {DUMMY, id, name, address};
	public static enum ExpenseCategoryFields {DUMMY, id, category_name};
	public static enum TaxNamesFields {DUMMY, id, tax_name};
	public static enum ExpenseFields {DUMMY, id, categoryid, employeeid, taxnameid, date, description, pretaxamount, taxamount};
 
	public DBSchema(String className, String url, String user, String password) throws Exception
	{
		if (_dbConnection == null)
		{
			Class.forName(className);
			_dbConnection = DriverManager.getConnection(url, user, password);
			
			GetEmployeesStmt = _dbConnection.prepareStatement(GetEmployees);
			GetExpenseCategoriesStmt = _dbConnection.prepareStatement(GetExpenseCategories);
			GetTaxNamesStmt = _dbConnection.prepareStatement(GetTaxNames);
			GetExpensesStmt = _dbConnection.prepareStatement(GetExpenses);
			GetMaxIDsStmt = _dbConnection.prepareStatement(GetMaxIDs);
			
			StoreEmployeeStmt = _dbConnection.prepareStatement(StoreEmployee);
			StoreCategoryStmt = _dbConnection.prepareStatement(StoreCategory);
			StoreTaxNameStmt = _dbConnection.prepareStatement(StoreTaxName);
			StoreExpenseStmt = _dbConnection.prepareStatement(StoreExpense);
		}
		else
		{
			throw new Exception("Connection already initialized");
		}
	}

	public void CloseConnection() throws SQLException 
	{
		if (_dbConnection != null)
		{
			_dbConnection.close();
		}
	}
}