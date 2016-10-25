package com.kenan.wave.webapp.service.data;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import com.kenan.wave.webapp.service.ExpenseItem;
import com.kenan.wave.webapp.service.SummaryItem;

public interface ExpenseStorage {
	public void createExpenseTable() throws SQLException;
	public Connection getDBConnection() throws SQLException, ClassNotFoundException;
	public void insertExpense(ExpenseItem expense) throws SQLException;
	public List<ExpenseItem> retrieveAllExpenses() throws SQLException;
	public List<SummaryItem> retrieveSummaryExpenses() throws SQLException;
	public void insertExpenses(List<ExpenseItem> expenses) throws SQLException;
}
