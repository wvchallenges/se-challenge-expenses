using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Wave_Challenge.Models;
using Wave_Challenge.Services;
namespace Wave_Challenge.Controllers.Web_API
{
    public class DataImportController : ApiController
    {
        // GET api/<controller>
        [HttpPost]
        public async Task<ImportResult> ImportExpenseRecords( IEnumerable<ExpenseRecord> records)
        {
            ImportResult result = await EmployeeExpenseService.ImportEmployeeExpenses(records);

            result.ReportData = await EmployeeExpenseService.PrepareMonthlyExpenseReport(records);
            return result;
        }

        
    }
}