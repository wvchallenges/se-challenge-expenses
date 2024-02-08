namespace WebApplication.Models
{
	public class ExpenseReportViewModel
	{
		public string Month { get; set; }
		public double PreTaxSum { get; set; }
		public double TaxSum { get; set; }
		public double ExpenseSum { get; set; }
	}
}
