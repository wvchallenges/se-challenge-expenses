using System;

namespace WebApplication.Models
{
	public class Expense
	{
		//date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
		// could be broken into Employee, Tax etc
		public DateTime Date { get; set; }
		public string Category { get; set; }
		public string EmployeeName { get; set; }
		public string EmployeeAddress { get; set; }
		public string ExpenseDescription { get; set; }
		public double PreTaxAmount { get; set; }
		public string TaxName { get; set; }
		public double TaxAmount { get; set; }
	}
}
