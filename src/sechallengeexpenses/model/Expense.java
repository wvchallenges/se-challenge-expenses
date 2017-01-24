package sechallengeexpenses.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Expense {
	private Date date = null;
	private String category = null; //TODO: make own object
	private String description = null;
	private Employee employee = null;
	private SaleTax saleTax = null;
	private double amount = 0.0;
	
	public static String sqlTableName = "EXPENSE";
	public static String sqlCreate = 
			"CREATE TABLE " + sqlTableName + " " +
            "(ID INTEGER PRIMARY KEY  AUTOINCREMENT," +
            " DATE          DATE    NOT NULL, " + 
            " DESCRIPTION   TEXT, " + 
            " EMPLOYEE_REF	INTEGER, " +
            " SALETAX_REF	INTEGER" +
            " )"; 
	public static String sqlExist = "SELECT name FROM sqlite_master WHERE type='table' AND name='"+sqlTableName+"'";
	
	public Expense(Date date, String category, String description, double amount, Employee employee, SaleTax saleTax)
	{
		this.date = date;
		this.category = category;
		this.description = description;
		this.amount = amount;
		this.employee = employee;
		this.saleTax = saleTax;
	}
	
	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public void setEmployee(Employee employee)
	{
		this.employee = employee;
	}
	
	public Employee getEmployee()
	{
		return this.employee;
	}
	
	public void setSaleTax(SaleTax saleTax)
	{
		this.saleTax = saleTax;
	}
	
	public SaleTax getSaleTax()
	{
		return this.saleTax;
	}
	
	public void setDate(Date date)
	{
		this.date = date;
	}
	
	public Date getDate()
	{
		return this.date;
	}
	
	public String insertStatement()
	{
		if( this.date == null || this.description == null || this.date == null || this.employee == null || this.saleTax == null || this.employee.getDbKey() < 0 || this.saleTax.getDbKey() < 0)
		{
			return null;
		}
		else
		{
			return "INSERT INTO " + Expense.sqlTableName + " (DATE,DESCRIPTION,EMPLOYEE_REF,SALETAX_REF) VALUES (\""+(new SimpleDateFormat("yyyy-MM-dd 00:00:00.000")).format(this.date) +"\",\""+this.description+"\","+this.employee.getDbKey() + "," + this.saleTax.getDbKey() + ")";
		} 
	}
	
	@Override
	public String toString()
	{
		return this.getDate() + "," + this.category + "," + this.employee.getName() + "," + this.employee.getAddress() + "," + this.description + "," + this.amount + "," + this.saleTax.getName() + "," + this.saleTax.calcuateTax(this.amount);
		
	}
	
	public static String selectAllStatement()
	{
		return "SELECT * FROM " + Expense.sqlTableName;
	}
}
