using System.Collections.Generic;
using WebApplication.Models;

namespace WebApplication.Data
{
	public interface IExpenseRepository
	{
		IList<ExpenseReportViewModel> GetExpenseReport();
		void SaveExpenses(IList<Expense> imports);
	}
}
