package ca.datasports.wavechallenge.data;

import java.util.LinkedList;
import java.util.List;

public class ExpenseReport {
	
	private List<Expense> _expenses = new LinkedList<>();
	private DataEntityCollection<Employee> _employees = new DataEntityCollection<>();
	private DataEntityCollection<ExpenseCategory> _categories = new DataEntityCollection<>();
	private DataEntityCollection<TaxName> _taxNames = new DataEntityCollection<>();
	

	public Employee registerEmployee(Employee employee)
	{
		return _employees.registerItem(employee);
	}

	public ExpenseCategory registerCategory(ExpenseCategory category)
	{
		return _categories.registerItem(category);
	}

	public TaxName registerTaxName(TaxName taxName)
	{
		return _taxNames.registerItem(taxName);
	}
	
	
	public void addExpense(Expense expense)
	{
		_expenses.add(expense);
	}

	public List<Expense> getExpenses()
	{
		return _expenses;
	}

	public List<Expense> getUncommittedExpenses()
	{
		List<Expense> result = new LinkedList<>();
		
		for (Expense curExpense : _expenses)
		{
			if (curExpense.getDbId() == DataEntityBase.NO_DB_ID)
			{
				result.add(curExpense);
			}
		}
		
		return result;
	}
	
	public DataEntityCollection<Employee> getEmployees()
	{
		return _employees;
	}
	
	public DataEntityCollection<ExpenseCategory> getCategories()
	{
		return _categories;
	}
	
	public DataEntityCollection<TaxName> getTaxNames()
	{
		return _taxNames;
	}

	public void addExpensePropsWithLookup(
			ExpenseProperties expenseProps,
			int expenseId,
			int employeeId,
			int categoryId, 
			int taxNameId) 
	{
		Expense expense = new Expense(
			expenseProps.getDate(), 
			expenseProps.getDescription(),
			expenseProps.getPreTaxAmount(),
			expenseProps.getTaxAmount(), 
			_employees.getByDbId(employeeId), 
			_categories.getByDbId(categoryId), 
			_taxNames.getByDbId(taxNameId)
		);

		expense.setDbId(expenseId);
		
		_expenses.add(expense);
	}
	
}
