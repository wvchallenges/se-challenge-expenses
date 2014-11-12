using System;
using System.Globalization;
using System.IO;
using CsvHelper;
using WaveChallenge.Models;

namespace WaveChallenge.Infrastructure
{
    internal class ExpenseProcessor
    {
        public static void Process(string filePath)
        {
            using (var textReader = new StreamReader(filePath))
            {
                using (var csv = new CsvReader(textReader))
                {
                    while (csv.Read())
                    {
                        var expense = new Expense
                        {
                            Id = Guid.NewGuid().ToString(),
                            EmployeeId = Guid.NewGuid().ToString(),
                            Date = csv.GetField<DateTime>("date"),
                            Category = csv.GetField<string>("category"),
                            Description = csv.GetField<string>("expense description"),
                            PreTaxAmount = ParseDecimal(csv.GetField<string>("pre-tax amount")),
                            TaxName = csv.GetField<string>("tax name"),
                            TaxAmount = ParseDecimal(csv.GetField<string>("tax amount")),
                        };

                        var employee = new Employee
                        {
                            Id = expense.EmployeeId,
                            Name = csv.GetField<string>("employee name"),
                            Address = csv.GetField<string>("employee address"),
                        };

                        new Db().SaveData(expense, employee);
                    }
                }
            }
        }

        /// <summary>
        /// Specail parsing style with thousand commas
        /// </summary>
        public static decimal ParseDecimal(string decimalStr)
        {
            return decimal.Parse(decimalStr, NumberStyles.Float | NumberStyles.AllowThousands);
        }
    }
}
