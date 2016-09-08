using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wave_Challenge.Models
{
    public class ImportResult
    {
        public bool Success;
        public Exception Exception;
        public IEnumerable<MonthlyExpenseTotal> ReportData;

        public ImportResult() {
            Success = true;
        }
    }
}