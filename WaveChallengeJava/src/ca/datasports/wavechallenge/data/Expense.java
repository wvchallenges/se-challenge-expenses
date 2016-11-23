package ca.datasports.wavechallenge.data;

import java.util.Date;

public class Expense extends ExpenseProperties {
	
	private Employee _employee;
	private ExpenseCategory _category;
	private TaxName _taxName;
	

	public Expense(Date date, String description, Double preTaxAmount,
			Double taxAmount, Employee employee, ExpenseCategory category,
			TaxName taxName) 
	{
		super(date, description, preTaxAmount, taxAmount);

		_employee = employee;
		_category = category;
		_taxName = taxName;
	}
	
	public Employee getEmployee()
	{
		return _employee;
	}
	
	public ExpenseCategory getExpenseCategory()
	{
		return _category;
	}
	
	public TaxName getTaxName()
	{
		return _taxName;
	}
	
	
	public String toString()
	{
		return 
			"_dbId: " + _dbId
			+ ", _date: " + _date.toString() + ", _description: '" + _description 
			+ "', _preTaxAmount: " + _preTaxAmount + ", _taxAmount: " + _taxAmount
			+ ", _employee: (" + _employee.getDbId() + ", '" + _employee.getName() + "', '" + _employee.getAddress() 
			+ "'), _category: (" + _category.getDbId() + ", '" + _category.getCategory() + "')"
			+ ", _taxName: (" + _taxName.getDbId() + ", '" + _taxName.getTaxName() + "')";
		
	}
	
}
