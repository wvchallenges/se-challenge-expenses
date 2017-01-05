package com.wave.csvconverter.utils.persistence;

import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.SortedMap;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.wave.csvconverter.domain.EmployeeExpense;
import com.wave.csvconverter.domain.MonthlyExpense;
import com.wave.csvconverter.exception.CSVConversionException;

/*
 * Helper utility class which process Employee Expenses data
 * and calculates total monthly expanses based on the date
 * pre-tax and tax amounts.
 */
public class MonthlyExpensesCalculator {

	private static final Logger log = LoggerFactory.getLogger(MonthlyExpensesCalculator.class);

	public List<MonthlyExpense> getTotalMonthlyExpenses(List<EmployeeExpense> eployeeExpenses) {
		Comparator<Date> dateMonthComparator = new Comparator<Date>() {
			@Override
			public int compare(Date date1, Date date2) {
				Calendar cal1 = Calendar.getInstance();
				Calendar cal2 = Calendar.getInstance();
				cal1.setTime(date1);
				cal2.setTime(date2);
				return (cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR)
						&& cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH)) ? 0 : date1.compareTo(date2);
			}
		};
		// Sort the expenses' dates in the Set
		SortedMap<Date, MonthlyExpense> monthlyExpenses = new TreeMap<Date, MonthlyExpense>(dateMonthComparator);
		Calendar calendar = Calendar.getInstance();
		NumberFormat format = NumberFormat.getInstance(Locale.US);
		for (EmployeeExpense expense : eployeeExpenses) {
			calendar.setTime(expense.getDate());
			// When storing the month dates keep them consistently set to the
			// first day of the month at 0:0:0 o'clock
			calendar.set(Calendar.DAY_OF_MONTH, 1);

			MonthlyExpense oldValue = monthlyExpenses.get(calendar.getTime());
			MonthlyExpense newValue;
			try {
				newValue = (oldValue == null)
						? new MonthlyExpense(calendar.getTime(),
								format.parse(expense.getPretax_amount()).doubleValue()
										+ format.parse(expense.getTax_amount()).doubleValue())
						: new MonthlyExpense(oldValue.getMonthYear(),
								oldValue.getExpenses() + format.parse(expense.getPretax_amount()).doubleValue()
										+ format.parse(expense.getTax_amount()).doubleValue());
				monthlyExpenses.put(calendar.getTime(), newValue);
			} catch (ParseException e) {
				log.error("Unable to parse monthly expenses: " + e.getMessage());
				throw new CSVConversionException("Unable to parse monthly expense", e);
			}

		}
		return new ArrayList<MonthlyExpense>(monthlyExpenses.values());
	}
}
