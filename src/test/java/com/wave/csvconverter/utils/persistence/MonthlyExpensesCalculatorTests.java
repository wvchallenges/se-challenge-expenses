package com.wave.csvconverter.utils.persistence;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.junit4.SpringRunner;

import com.wave.csvconverter.domain.EmployeeExpense;
import com.wave.csvconverter.domain.MonthlyExpense;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class MonthlyExpensesCalculatorTests {
	@Test
	public void testGetTotalMonthlyExpenses_emptyList() throws Exception {
		MonthlyExpensesCalculator expensesCalculator = new MonthlyExpensesCalculator();
		List<EmployeeExpense> eployeeExpenses = new ArrayList<EmployeeExpense>();
		assertTrue(expensesCalculator.getTotalMonthlyExpenses(eployeeExpenses).isEmpty());
	}

	@Test
	public void testGetTotalMonthlyExpenses_sameMonthList() throws Exception {
		MonthlyExpensesCalculator expensesCalculator = new MonthlyExpensesCalculator();
		List<EmployeeExpense> eployeeExpenses = new ArrayList<EmployeeExpense>();
		Calendar calendar = Calendar.getInstance();
		Date date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "100.10", "HST", "13.013"));
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, 2);
		date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "1,000.00", "HST", "130.00"));
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "10,000.00", "HST", "1,300.00"));

		List<MonthlyExpense> monthlyExpenses = expensesCalculator.getTotalMonthlyExpenses(eployeeExpenses);
		assertEquals(1, monthlyExpenses.size());

		MonthlyExpense expense1 = monthlyExpenses.get(0);
		assertEquals(date, expense1.getMonthYear());
		assertEquals((Double) 12543.113, expense1.getExpenses());
	}

	@Test
	public void testGetTotalMonthlyExpenses_differentMonthsList() throws Exception {
		MonthlyExpensesCalculator expensesCalculator = new MonthlyExpensesCalculator();
		List<EmployeeExpense> eployeeExpenses = new ArrayList<EmployeeExpense>();
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.MONTH, 1);
		Date date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "100.00", "HST", "13.00"));
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, 2);
		date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "1,000.00", "HST", "130.00"));
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "10,000.00", "HST", "1,300.00"));

		calendar.set(Calendar.MONTH, 2);
		Date date2 = calendar.getTime();

		eployeeExpenses.add(new EmployeeExpense(date2, "category", "employee name", "employee address",
				"employee description", "100.00", "HST", "13.00"));
		calendar.set(Calendar.DAY_OF_MONTH, 2);
		date2 = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date2, "category", "employee name", "employee address",
				"employee description", "1,000.00", "HST", "130.00"));
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		date2 = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date2, "category", "employee name", "employee address",
				"employee description", "10,000.00", "HST", "1,300.00"));

		List<MonthlyExpense> monthlyExpenses = expensesCalculator.getTotalMonthlyExpenses(eployeeExpenses);
		assertEquals(2, monthlyExpenses.size());

		MonthlyExpense expense1 = monthlyExpenses.get(0);
		assertEquals(date, expense1.getMonthYear());
		assertEquals((Double) 12543.0, expense1.getExpenses());

		MonthlyExpense expense2 = monthlyExpenses.get(1);
		assertEquals(date2, expense2.getMonthYear());
		assertEquals((Double) 12543.0, expense2.getExpenses());
	}

	@Test
	public void testGetTotalMonthlyExpenses_differentYearsList() throws Exception {
		MonthlyExpensesCalculator expensesCalculator = new MonthlyExpensesCalculator();
		List<EmployeeExpense> eployeeExpenses = new ArrayList<EmployeeExpense>();
		Calendar calendar = Calendar.getInstance();
		Date date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "100.00", "HST", "13.00"));
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_MONTH, 2);
		date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "1,000.00", "HST", "130.00"));
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		date = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date, "category", "employee name", "employee address",
				"employee description", "10,000.00", "HST", "1,300.00"));

		calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR) + 1);
		Date date2 = calendar.getTime();

		eployeeExpenses.add(new EmployeeExpense(date2, "category", "employee name", "employee address",
				"employee description", "100.00", "HST", "13.00"));
		calendar.set(Calendar.DAY_OF_MONTH, 2);
		date2 = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date2, "category", "employee name", "employee address",
				"employee description", "1,000.00", "HST", "130.00"));
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		date2 = calendar.getTime();
		eployeeExpenses.add(new EmployeeExpense(date2, "category", "employee name", "employee address",
				"employee description", "10,000.00", "HST", "1,300.00"));

		List<MonthlyExpense> monthlyExpenses = expensesCalculator.getTotalMonthlyExpenses(eployeeExpenses);
		assertEquals(2, monthlyExpenses.size());

		MonthlyExpense expense1 = monthlyExpenses.get(0);
		assertEquals(date, expense1.getMonthYear());
		assertEquals((Double) 12543.0, expense1.getExpenses());

		MonthlyExpense expense2 = monthlyExpenses.get(1);
		assertEquals(date2, expense2.getMonthYear());
		assertEquals((Double) 12543.0, expense2.getExpenses());
	}
}
