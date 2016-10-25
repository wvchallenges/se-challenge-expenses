
package com.kenan.wave.webapp.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.kenan.wave.webapp.service.data.ExpenseStorage;
import com.kenan.wave.webapp.service.etl.ProcessCSV;

public class ExpenseService {
	Logger LOGGER = Logger.getLogger(ExpenseService.class);
	final private ExpenseStorage myStorage;
	
	public ExpenseService(ExpenseStorage myStorage) {
		this.myStorage = myStorage;
		LOGGER.info("Expense storage is ready ["+(this.myStorage!=null)+"]");
	}
	
	public void processExpenses() throws BusinessException {
		ProcessCSV parser = new ProcessCSV();
		try {
			List<ExpenseItem> expenses = parser.parse();
			myStorage.createExpenseTable();
			myStorage.insertExpenses(expenses);
		} catch (IOException | SQLException e) {
			LOGGER.error(e.getMessage(), e);
			throw new BusinessException("System error");
		}
	}

	public List<SummaryItem> getSummary() throws BusinessException {
		List<SummaryItem> summary;
		try {
			summary = myStorage.retrieveSummaryExpenses();
		} catch (SQLException e) {
			LOGGER.error(e.getMessage(), e);
			throw new BusinessException("System error");
		}
		if (summary.isEmpty())
			 throw new BusinessException("No summary is available");
		return summary;
	}
}
