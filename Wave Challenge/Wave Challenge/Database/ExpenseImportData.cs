using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using Wave_Challenge.Models;
using Dapper;
using System.Threading.Tasks;

namespace Wave_Challenge.Database
{
    public class ExpenseImportData : Connection
    {
        public ExpenseImportData() : base() { }
        
        public async Task<ImportResult> ImportEmployeeExpenses(IEnumerable<ExpenseRecord> records)
        {
            ImportResult result = new ImportResult();

            string sql = @"
INSERT INTO public.""EmployeeExpense"" (""Date"", ""Category"", ""EmployeeName"", ""EmployeeAddress"", ""ExpenseDescription"", 
       ""PreTaxAmount"", ""TaxName"", ""TaxAmount"")
VALUES (@Date, @Category, @EmployeeName, @EmployeeAddress, @ExpenseDescription, 
       @PreTaxAmount, @TaxName, @TaxAmount)
";
            try
            {
                await conn.ExecuteAsync(sql, records);
            }
            catch (Exception e) {
                result.Success = false;
                result.Exception = e;
            }

            return result;
        }
    }
}