using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using WaveHomework.Models;

namespace WaveHomework
{
    public static class DatabaseHelper
    {
        public static string ConnectionString { get; private set; }

        static DatabaseHelper()
        {
            var settings = ConfigurationManager.ConnectionStrings["WaveContext"];
            if (settings != null)
            {
                ConnectionString = settings.ConnectionString;
            }
            else
            {
                ConnectionString = null;
            }
        }

        public static IList<TotalExpensesByMonth> GetTotalExpensesByMonth()
        {
            var totalExpenses = new List<TotalExpensesByMonth>();

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                var query = @"SELECT YEAR(date) as Year,
                                MONTH(date) as Month,
                                SUM(PretaxAmount) AS Total
                                FROM Expenses
                                GROUP BY YEAR(date), MONTH(date)
                                ORDER BY YEAR(date), MONTH(date)";
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        totalExpenses.Add(new TotalExpensesByMonth(reader.GetInt32(0), reader.GetInt32(1), reader.GetDecimal(2)));
                    }
                }
            }
            return totalExpenses;
        }
    }
}