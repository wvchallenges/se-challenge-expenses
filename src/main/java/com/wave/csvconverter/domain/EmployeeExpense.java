package com.wave.csvconverter.domain;

import java.util.Date;

/*
 * POJO model for the Employee Expense record in the database
 */
public class EmployeeExpense {
	private Date date;
	private String category;
	private String employee_name;
	private String employee_address;
	private String expense_description;
	private String pretax_amount;
	private String tax_name;
	private String tax_amount;

	public EmployeeExpense() {

	}

	public EmployeeExpense(Date date, String category, String employee_name, String employee_address,
			String expense_description, String pretax_amount, String tax_name, String tax_amount) {
		setDate(date);
		setCategory(category);
		setEmployee_name(employee_name);
		setEmployee_address(employee_address);
		setExpense_description(expense_description);
		setPretax_amount(pretax_amount);
		setTax_name(tax_name);
		setTax_amount(tax_amount);
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

	public String getEmployee_name() {
		return employee_name;
	}

	public void setEmployee_name(String employee_name) {
		this.employee_name = employee_name;
	}

	public String getEmployee_address() {
		return employee_address;
	}

	public void setEmployee_address(String employee_address) {
		this.employee_address = employee_address;
	}

	public String getExpense_description() {
		return expense_description;
	}

	public void setExpense_description(String expense_description) {
		this.expense_description = expense_description;
	}

	public String getPretax_amount() {
		return pretax_amount;
	}

	public void setPretax_amount(String pretax_amount) {
		this.pretax_amount = pretax_amount;
	}

	public String getTax_name() {
		return tax_name;
	}

	public void setTax_name(String tax_name) {
		this.tax_name = tax_name;
	}

	public String getTax_amount() {
		return tax_amount;
	}

	public void setTax_amount(String tax_amount) {
		this.tax_amount = tax_amount;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("EmployeeTax [date=").append(date).append(", category=").append(category)
				.append(", employee_name=").append(employee_name).append(", employee_address=").append(employee_address)
				.append(", expense_description=").append(expense_description).append(", pretax_amount=")
				.append(pretax_amount).append(", tax_name=").append(tax_name).append(", tax_amount=").append(tax_amount)
				.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((employee_address == null) ? 0 : employee_address.hashCode());
		result = prime * result + ((employee_name == null) ? 0 : employee_name.hashCode());
		result = prime * result + ((expense_description == null) ? 0 : expense_description.hashCode());
		result = prime * result + ((pretax_amount == null) ? 0 : pretax_amount.hashCode());
		result = prime * result + ((tax_amount == null) ? 0 : tax_amount.hashCode());
		result = prime * result + ((tax_name == null) ? 0 : tax_name.hashCode());
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
		EmployeeExpense other = (EmployeeExpense) obj;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
			return false;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		if (employee_address == null) {
			if (other.employee_address != null)
				return false;
		} else if (!employee_address.equals(other.employee_address))
			return false;
		if (employee_name == null) {
			if (other.employee_name != null)
				return false;
		} else if (!employee_name.equals(other.employee_name))
			return false;
		if (expense_description == null) {
			if (other.expense_description != null)
				return false;
		} else if (!expense_description.equals(other.expense_description))
			return false;
		if (pretax_amount == null) {
			if (other.pretax_amount != null)
				return false;
		} else if (!pretax_amount.equals(other.pretax_amount))
			return false;
		if (tax_amount == null) {
			if (other.tax_amount != null)
				return false;
		} else if (!tax_amount.equals(other.tax_amount))
			return false;
		if (tax_name == null) {
			if (other.tax_name != null)
				return false;
		} else if (!tax_name.equals(other.tax_name))
			return false;
		return true;
	}

}
