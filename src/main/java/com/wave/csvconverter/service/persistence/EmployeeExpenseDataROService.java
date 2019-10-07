package com.wave.csvconverter.service.persistence;

import java.util.List;

import com.wave.csvconverter.domain.EmployeeExpense;
import com.wave.csvconverter.domain.MonthlyExpense;

public interface EmployeeExpenseDataROService {
	List<EmployeeExpense> getAllEmployeeExpenses();

	List<MonthlyExpense> getTotalMonthlyExpenses();
}
