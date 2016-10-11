using CsvHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WaveHomework.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Upload(HttpPostedFileBase file)
        {
            using (var connection = new SqlConnection(DatabaseHelper.ConnectionString))
            {
                connection.Open();
                using (var bulkCopy = new SqlBulkCopy(connection))
                {
                    bulkCopy.DestinationTableName = "dbo.Expenses";
                    var table = CreateExpenseDataTable();
                    var count = 0;

                    using (var streamReader = new StreamReader(file.InputStream)) // Will buffer to disk if the file is larger than 256 KB
                    {
                        using (var csvReader = new CsvReader(streamReader))
                        {
                            while (csvReader.Read())
                            {
                                table.Rows.Add(ConvertToExpenseRow(csvReader.CurrentRecord));
                                count++;
                                if (count == 1000)
                                {
                                    bulkCopy.WriteToServer(table); // Faster than insert each row, SqlBulkCopy is not vulnerable to SQL Injection
                                    table = CreateExpenseDataTable();
                                    count = 0;
                                }
                            }

                            if (count > 0)
                            {
                                bulkCopy.WriteToServer(table);
                            }
                        }
                    }
                }
            }
            return RedirectToAction("Monthly", "Expenses");
        }

        public DataTable CreateExpenseDataTable()
        {
            var table = new DataTable();
            table.Columns.Add(new DataColumn("Id", typeof(int))); // Place-holder for auto columns mapping, SqlBulkCopy will ignore it with KeepIdentity=false
            table.Columns.Add(new DataColumn("Date", typeof(DateTime)));
            table.Columns.Add(new DataColumn("Category", typeof(string)));
            table.Columns.Add(new DataColumn("EmployeeName", typeof(string)));
            table.Columns.Add(new DataColumn("EmployeeAddress", typeof(string)));
            table.Columns.Add(new DataColumn("ExpenseDescription", typeof(string)));
            table.Columns.Add(new DataColumn("PretaxAmount", typeof(decimal)));
            table.Columns.Add(new DataColumn("TaxName", typeof(string)));
            table.Columns.Add(new DataColumn("TaxAmount", typeof(decimal)));
            return table;
        }

        public object[] ConvertToExpenseRow(string[] inputRow)
        {
            // Assuming the input row is always in the correct order
            var row = new object[9];

            DateTime dt;
            if (DateTime.TryParseExact(inputRow[0], "M/d/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dt))
            {
                row[1] = dt;
            }
            else
            {
                row[1] = new DateTime();
            }
            for (var i = 1; i <= inputRow.Length - 1; i++)
            {
                if (i == 5 || i == 7)
                {
                    row[i + 1] = decimal.Parse(inputRow[i]); // decimall allows ','
                }
                row[i + 1] = inputRow[i];
            }

            return row;
        }
    }
}