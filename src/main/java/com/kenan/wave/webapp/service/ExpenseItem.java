package com.kenan.wave.webapp.service;

import java.math.BigDecimal;
import java.sql.Date;

public class ExpenseItem {
	private Date date;
	private String category;
	private String empName;
	private String empAddress;
	private String desc;
	private BigDecimal pretax;
	private String taxName;
	private BigDecimal taxAmount;
	
	public ExpenseItem(Date date, String category, String empName,
			String empAddress, String desc, BigDecimal pretax, String taxName,
			BigDecimal taxAmount) {
		super();
		this.date = date;
		this.category = category;
		this.empName = empName;
		this.empAddress = empAddress;
		this.desc = desc;
		this.pretax = pretax;
		this.taxName = taxName;
		this.taxAmount = taxAmount;
	}
	public ExpenseItem() {

	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getEmpAddress() {
		return empAddress;
	}
	public void setEmpAddress(String empAddress) {
		this.empAddress = empAddress;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public BigDecimal getPretax() {
		return pretax;
	}
	public void setPretax(BigDecimal pretax) {
		this.pretax = pretax;
	}

	public String getTaxName() {
		return taxName;
	}
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	public BigDecimal getTaxAmount() {
		return taxAmount;
	}
	public void setTaxAmount(BigDecimal taxAmount) {
		this.taxAmount = taxAmount;
	}
	@Override
	public String toString() {
		return "ExpenseItem [date=" + date + ", category=" + category
				+ ", empName=" + empName + ", empAddress=" + empAddress
				+ ", desc=" + desc + ", pretax=" + pretax + ", taxName="
				+ taxName + ", taxAmount=" + taxAmount + "]";
	}
	
}
