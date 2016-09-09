using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Wave_Challenge.Models;
using Wave_Challenge.Database;
using System.Transactions;

namespace Wave_Challenge.Services
{
    public static class EmployeeExpenseService
    {
        public static async Task<ImportResult> ImportEmployeeExpenses(IEnumerable<ExpenseRecord> records)
        {
            ImportResult result;
            using (TransactionScope tx = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (ExpenseImportData db = new ExpenseImportData())
                {
                    result = await db.ImportEmployeeExpenses(records).ConfigureAwait(false);
                }
                tx.Complete();
            }

            return result;
        }

        public static async Task<IEnumerable<MonthlyExpenseTotal>> PrepareMonthlyExpenseReport(IEnumerable<ExpenseRecord> records)
        {
            List<MonthlyExpenseTotal> report = new List<MonthlyExpenseTotal>();
            MonthlyExpenseTotal currentMonthTotal;

            // Build totals
            foreach (ExpenseRecord record in records) {
                // find matching month
                currentMonthTotal = report.FirstOrDefault(x => x.Year == record.Date.Year && x.Month == record.Date.Month);
                if (currentMonthTotal != null)
                {
                    // Accumulate Total Amount for the month
                    currentMonthTotal.Amount += record.PreTaxAmount + record.TaxAmount;
                }
                else
                {
                    // Start Total Amount for the month
                    currentMonthTotal = new MonthlyExpenseTotal() {
                        Year = record.Date.Year,
                        Month = record.Date.Month,
                        Amount = record.PreTaxAmount + record.TaxAmount
                    };
                    report.Add(currentMonthTotal);
                }
            }

            // Sort records
            report = report.OrderByDescending(x => x.Year).ThenByDescending(x => x.Month).ToList();

            return report;

        }
    }
}