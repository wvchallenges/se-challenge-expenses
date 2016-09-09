using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wave_Challenge.Models
{
    public class MonthlyExpenseTotal
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public Decimal Amount { get; set; }
    }
}