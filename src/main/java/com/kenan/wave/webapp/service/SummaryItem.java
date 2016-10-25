package com.kenan.wave.webapp.service;

import java.math.BigDecimal;

public class SummaryItem {
	private String month;
	private String year;
	private BigDecimal total;

	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public BigDecimal getTotal() {
		return total;
	}
	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "SummaryItem [month=" + month + ", year=" + year + ", total="
				+ total + "]";
	}
}
