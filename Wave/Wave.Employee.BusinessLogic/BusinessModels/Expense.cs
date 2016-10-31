using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wave.Employee.BusinessLogic
{
    public class BrokeredExpense
    {
        public List<Expense> Expenses { get; set; }
        public string ConnectionId { get; set; }
    }
    public class Expense
    {
        public string Date { get; set; }
        public string Category { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeAddress { get; set; }
        public string ExpenseDescription { get; set; }
        public decimal PretaxAmount { get; set; }
        public string TaxName { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal TotalExpenseAmount
        {
            get
            {
                return PretaxAmount + TaxAmount;
            }
        }
        public int Month { get; set; }
    }
}
