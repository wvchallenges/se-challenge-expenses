package sechallengeexpenses.database;

import java.sql.Connection;

import sechallengeexpenses.model.Employee;
import sechallengeexpenses.model.Expense;
import sechallengeexpenses.model.SaleTax;

public interface IDatabase {
	
	/**
	 * Connect to the database
	 */
	public void connect();
	
	/**
	 * Get the connection object
	 * @return Connection The connection object. Null if not connected.
	 */
	public Connection getConnection();
	
	/**
	 * Insert an expense into the database
	 * @param expense The Expense object to be inserted
	 */
	public void insert(Expense expense);
	
	/**
	 * Insert an employee into the database
	 * @param Employee The Employee object to be inserted
	 */
	public void insert(Employee employee);
	
	/**
	 * Insert a sale tax into the database
	 * @param saleTax The SaleTax object to be inserted
	 */
	public void insert(SaleTax saleTax);
	
	/**
	 * Find the employ in the database
	 * @param employee The Employee object to be found
	 * @return int The index of the matched employee. -1 if not found.
	 */
	public int findEmployee(Employee employee);
	
	/**
	 * Find the sale tax in the database
	 * @param saleTax The SaleTax object to be found
	 * @return int The index of the matched sale tax. -1 if not found.
	 */
	public int findSaleTax(SaleTax saleTax);
	
	/**
	 * Print all objects in the database of a type
	 * @param classToPrint The object type to print. 
	 */
	public String printAll(Class classToPrint);
	
}
