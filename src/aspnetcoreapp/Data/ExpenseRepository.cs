using System;
using System.Collections.Generic;
using System.IO;
using Dapper;
using WebApplication.Models;
using System.Linq;
using Microsoft.AspNetCore.Hosting;

namespace WebApplication.Data
{
	public class ExpenseRepository : DapperBaseRepo, IExpenseRepository
	{
        public ExpenseRepository(IHostingEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        private void CreateDatabase()
		{
			using (var cnn = SimpleDbConnection())
			{
				cnn.Open();
				cnn.Execute(createExpenseTable);
			}
		}

		public IList<ExpenseReportViewModel> GetExpenseReport()
		{
			if (!File.Exists(DbFile))
			{
				return new List<ExpenseReportViewModel>();
			}
			IList<ExpenseReportViewModel> entities;
			
			using (var cnn = SimpleDbConnection())
			{
				cnn.Open();
				entities = cnn.Query <ExpenseReportViewModel>(expenseSumSql).ToList();
			}
			return entities;
		}

		public void SaveExpenses(IList<Expense> expenses)
		{
			if (!File.Exists(DbFile))
			{
				CreateDatabase();
			}

			using (var cnn = SimpleDbConnection())
			{
				cnn.Open();
				foreach (var expense in expenses)
				{
					int id = cnn.Query<int>(
					expenseInsertSql, expense).First();
				}
			}

		}

		private const string createExpenseTable = @"create table Expense
					(
						ID						INTEGER PRIMARY KEY AUTOINCREMENT,
						Date					DATETIME not null,
						Category				TEXT not null,
						EmployeeName			DATETIME not null,
						EmployeeAddress			TEXT not null,
						ExpenseDescription		TEXT not null,
						PreTaxAmount			REAL not null,
						TaxName					TEXT not null,
						TaxAmount				REAL not null
					)";

		private const string expenseSumSql = @"select SUM(PreTaxAmount) as PreTaxSum,
							SUM (TaxAmount) as TaxSum,
							SUM (PreTaxAmount + TaxAmount) as ExpenseSum, 
							strftime(""%Y-%m"", Date) as Month 
							from expense group by strftime(""%Y-%m"", Date);";

		private const string expenseInsertSql = @"INSERT INTO Expense 
					( Date, Category, EmployeeName, EmployeeAddress, ExpenseDescription, PreTaxAmount, TaxName, TaxAmount) VALUES 
					( @Date, @Category, @EmployeeName, @EmployeeAddress, @ExpenseDescription, @PreTaxAmount, @TaxName, @TaxAmount);
					select last_insert_rowid()";
	}
}
