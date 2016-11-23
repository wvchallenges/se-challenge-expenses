package ca.datasports.wavechallenge.reporting;

import java.util.Collection;
import java.util.SortedMap;
import java.util.TreeMap;

import ca.datasports.wavechallenge.data.Expense;
import ca.datasports.wavechallenge.data.ExpenseReport;

public class MonthlyBreakdown {
	
	public static Collection<MonthSummary> GetMonthlySummary(ExpenseReport report) throws Exception
	{
		SortedMap<String, MonthSummary> allMonths = new TreeMap<>();
		
		for (Expense curExpense : report.getExpenses())
		{
			MonthSummary curSpending = new MonthSummary(curExpense.getDate(), curExpense.getPreTaxAmount() + curExpense.getTaxAmount());
			if (allMonths.containsKey(curSpending.getKey()))
			{
				allMonths.get(curSpending.getKey()).add(curSpending);
			}
			else
			{
				allMonths.put(curSpending.getKey(), curSpending);
			}
		}
		
		return allMonths.values();
	}
}
