using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WaveHomework.Controllers
{
    public class ExpensesController : Controller
    {
        // GET: Expenses
        public ActionResult Monthly()
        {
            var totalExpenses = DatabaseHelper.GetTotalExpensesByMonth();

            return View(totalExpenses);
        }
    }
}