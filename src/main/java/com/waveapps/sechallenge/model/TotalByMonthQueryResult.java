package com.waveapps.sechallenge.model;

import java.text.DecimalFormat;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class TotalByMonthQueryResult {
	
	private static final DecimalFormat MONEY_FORMAT = new DecimalFormat("$ ###,##0.00");
	
	private int month;
	private int year;
	private double preTaxAmountTotal;
	private double taxAmountTotal;
	
	public TotalByMonthQueryResult(){}
	
	public TotalByMonthQueryResult(int month, int year, double preTaxAmountTotal, double taxAmountTotal) {
		super();
		this.month = month;
		this.year = year;
		this.preTaxAmountTotal = preTaxAmountTotal;
		this.taxAmountTotal = taxAmountTotal;
	}
	
	public TotalByMonthQueryResult(Object[] totalByMonthQueryResult) {
		super();
		this.month = (Integer) totalByMonthQueryResult[0];
		this.year = (Integer) totalByMonthQueryResult[1];
		this.preTaxAmountTotal = (Double) totalByMonthQueryResult[2];
		this.taxAmountTotal = (Double) totalByMonthQueryResult[3];
	}	
	public int getMonth() {
		return month;
	}
	public String getMonthString() {
		return Month.of(month).getDisplayName(TextStyle.FULL, Locale.CANADA);
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public double getPreTaxAmountTotal() {
		return preTaxAmountTotal;
	}
	public String getPreTaxAmountTotalString() {
		return MONEY_FORMAT.format(preTaxAmountTotal);
	}
	public void setPreTaxAmountTotal(double preTaxAmountTotal) {
		this.preTaxAmountTotal = preTaxAmountTotal;
	}
	public double getTaxAmountTotal() {
		return taxAmountTotal;
	}
	public String getTaxAmountTotalString() {
		return MONEY_FORMAT.format(preTaxAmountTotal);
	}
	public void setTaxAmountTotal(double taxAmountTotal) {
		this.taxAmountTotal = taxAmountTotal;
	}
	public String getGrandTotalString() {
		return MONEY_FORMAT.format(preTaxAmountTotal + taxAmountTotal);
	}
	
	@Override
	public String toString() {
		String json = "{";
		
		json +=" \"month\":" + month + ",";
		json +=" \"year\":" + year + ",";
		json +=" \"preTaxAmountTotal\":" + preTaxAmountTotal + ",";
		json +=" \"taxAmountTotal\":" + taxAmountTotal + "";
		
		json += "}";
		return json;
	}
}
