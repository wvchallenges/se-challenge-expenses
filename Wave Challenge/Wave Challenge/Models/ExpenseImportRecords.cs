using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wave_Challenge.Models
{
    public class ExpenseImportRecords
    {
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeAddress { get; set; }
        public string ExpenseDescription { get; set; }
        public decimal PreTaxAmount { get; set; }
        public string TaxName { get; set; }
        public decimal TaxAmount { get; set; }        
    }
}