using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Wave_Challenge.Models;

namespace Wave_Challenge.Controllers.Web_API
{
    public class DataImportController : ApiController
    {
        // GET api/<controller>
        [HttpPost]
        public async Task<ImportResult> ImportExpenseRecords( IEnumerable<ExpenseImportRecords> records)
        {

            return new ImportResult {Success = true };
        }

        
    }
}