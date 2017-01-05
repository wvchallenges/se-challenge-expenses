package com.wave.csvconverter.domain;

import java.util.Date;

/*
 * POJO model of the object returned to clients which includes information
 * about monthly employees' expenses
 */
public class MonthlyExpense {
	private Date monthYear;
	private Double expenses;

	public MonthlyExpense(Date monthYear, Double expenses) {
		setMonthYear(monthYear);
		setExpenses(expenses);
	}

	public Date getMonthYear() {
		return monthYear;
	}

	public void setMonthYear(Date monthYear) {
		this.monthYear = monthYear;
	}

	public Double getExpenses() {
		return expenses;
	}

	public void setExpenses(Double expenses) {
		this.expenses = expenses;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("MonthlyExpense [monthYear=").append(monthYear).append(", expenses=").append(expenses)
				.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((expenses == null) ? 0 : expenses.hashCode());
		result = prime * result + ((monthYear == null) ? 0 : monthYear.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MonthlyExpense other = (MonthlyExpense) obj;
		if (expenses == null) {
			if (other.expenses != null)
				return false;
		} else if (!expenses.equals(other.expenses))
			return false;
		if (monthYear == null) {
			if (other.monthYear != null)
				return false;
		} else if (!monthYear.equals(other.monthYear))
			return false;
		return true;
	}
}
