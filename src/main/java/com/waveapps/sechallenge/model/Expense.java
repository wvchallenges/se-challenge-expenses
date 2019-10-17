package com.waveapps.sechallenge.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Expense {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private Date date;
	private String description;
	private double preTaxAmount;
	private double taxAmount;
	
	@ManyToOne
	private ExpenseCategory category;
	@ManyToOne
	private Employee employee;
	@ManyToOne
	private Tax tax;
	
	public Expense(){}
	
	public Expense(int id, Date date, ExpenseCategory category, Employee employee, String description,
			double preTaxAmount, Tax tax, double taxAmount) {
		super();
		this.id = id;
		this.date = date;
		this.category = category;
		this.employee = employee;
		this.description = description;
		this.preTaxAmount = preTaxAmount;
		this.tax = tax;
		this.taxAmount = taxAmount;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public ExpenseCategory getCategory() {
		return category;
	}
	public void setCategory(ExpenseCategory category) {
		this.category = category;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPreTaxAmount() {
		return preTaxAmount;
	}
	public void setPreTaxAmount(double preTaxAmount) {
		this.preTaxAmount = preTaxAmount;
	}
	public Tax getTax() {
		return tax;
	}
	public void setTax(Tax tax) {
		this.tax = tax;
	}
	public double getTaxAmount() {
		return taxAmount;
	}
	public void setTaxAmount(double taxAmount) {
		this.taxAmount = taxAmount;
	}
	
	@Override
	public String toString() {
		String json = "{";
		
		json +=" \"id\":" + id + ",";
		json +=" \"date\":" + (date == null ? "null " : "\"" + date.toString()) + "\",";
		json +=" \"description\":\"" + description + "\",";
		json +=" \"preTaxAmount\":" + preTaxAmount + ",";
		json +=" \"taxAmount\":" + taxAmount + ", ";
		json +=" \"category\":" + (category == null ? "null" : category.toString()) + ",";
		json +=" \"employee\":" + (employee == null ? "null" : employee.toString()) + ",";
		json +=" \"tax\":" + (tax == null ? "null" : tax.toString());
		
		json += "}";
		return json;
	}
	
}
