package com.tannerrutgers.sechallenge.application.expenses;

import com.tannerrutgers.sechallenge.application.common.Report;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Concrete Report class for expenses represented monthly
 */
class MonthlyExpenseReport extends Report<Expense> {

    private static final String TITLE = "Monthly Expense Report";
    private static final List<String> HEADERS = Arrays.asList("Month", "Total expenses");

    public MonthlyExpenseReport() {
        super(TITLE, HEADERS);
    }

    public MonthlyExpenseReport(List<Expense> expenses) {
        this();
        populateReport(expenses);
    }

    public void populateReport(List<Expense> expenses) {
        this.rows = new ArrayList<>();

        DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("MMM, yyyy");

        // Create sorted map of monthly expenses
        SortedMap<YearMonth, BigDecimal> expenseMap = new TreeMap<>();
        for (Expense expense : expenses) {
            LocalDate dateTime = expense.getDate();
            YearMonth yearMonth = YearMonth.of(dateTime.getYear(), dateTime.getMonth());
            expenseMap.putIfAbsent(yearMonth, BigDecimal.ZERO);
            expenseMap.put(yearMonth, expenseMap.get(yearMonth).add(expense.getExpense()));
        }

        // Parse monthly expense map back into list of rows
        for (Map.Entry<YearMonth, BigDecimal> entry : expenseMap.entrySet()) {
            List<String> row = new ArrayList<>();
            row.add(entry.getKey().format(DATE_FORMAT));
            row.add(DecimalFormat.getCurrencyInstance(Locale.US).format(entry.getValue()));
            rows.add(row);
        }
    }
}
