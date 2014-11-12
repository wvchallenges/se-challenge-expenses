using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using Dapper;
using WaveChallenge.Dapper;
using WaveChallenge.Models;
using WaveChallenge.ViewModels;

namespace WaveChallenge.Infrastructure
{
    /// <summary>
    /// All db related operations
    /// </summary>
    class Db
    {
        public static string DbFile = GetDbFilePath();

        private static string GetDbFilePath()
        {
            var directory = new DirectoryInfo(Environment.CurrentDirectory);

            //get db folder from "upper" structure
            while (!Directory.Exists(Path.Combine(directory.FullName, "db\\")))
            {
                directory = directory.Parent;
                if (directory == null)
                {
                    throw new Exception("Unsupported directory structure.");
                }
            }

            return Path.Combine(directory.FullName, "db\\Db.sqlite3");
        }

        static Db()
        {
            if (!File.Exists(DbFile))
            {
                CreateDatabase();
            }
        }

        private static void CreateDatabase()
        {
            using (var cnn = OpenConnection())
            {
                cnn.Execute(
                    @"CREATE TABLE Expenses
              (
                 Id VARCHAR(25) primary key,
                 EmployeeId VARCHAR(25) NOT NULL,
                 Date DATETIME NOT NULL,
                 Category VARCHAR(100) NOT NULL,
                 Description VARCHAR(500) NOT NULL,
                 PreTaxAmount DECIMAL(10,5) NOT NULL,
                 TaxName VARCHAR(300) NOT NULL,
                 TaxAmount DECIMAL(10,5) NOT NULL
              )");
                
                cnn.Execute(
                    @"CREATE TABLE Employees
              (
                 Id VARCHAR(25) primary key,
                 Name VARCHAR(300) NOT NULL,
                 Address VARCHAR(300) NOT NULL
              )");
            }
        }

        public void SaveData(Expense expense, Employee employee)
        {
            using (var connection = OpenConnection())
            {
                using (var transaction = connection.BeginTransaction())
                {
                    //todo: create one sql statement for checking and insert operation

                    //check existing employee
                    var existingEmployee = connection.Query("SELECT Id FROM Employees WHERE Name=@name", new {name = employee.Name}).FirstOrDefault();
                    if (existingEmployee == null)
                    {
                        connection.Insert(employee, transaction);
                    }
                    else
                    {
                        expense.EmployeeId = existingEmployee.Id;
                    }

                    connection.Insert(expense, transaction);

                    transaction.Commit();
                }
            }
        }

        public List<ExpenseViewModel> GetData()
        {
            if (!File.Exists(DbFile))
            {
                CreateDatabase();
            }

            using (var connection = OpenConnection())
            {
                const string sql =
                    @"
SELECT SUM(PreTaxAmount-TaxAmount) as TotalExpenses, 
    strftime(""%m-%Y"", Date) as YearMonth
FROM Expenses
GROUP BY strftime(""%m-%Y"", Date)";

                var expenses = connection.Query(sql).Select(_ => new ExpenseViewModel
                {
                    TotalExpenses = ExpenseProcessor.ParseDecimal(_.TotalExpenses.ToString()),
                    YearMonth = _.YearMonth.ToString(),
                    //DateTime.ParseExact(_.YearMonth, "MM-yyyy", CultureInfo.InvariantCulture),
                }).ToList();

                return expenses;
            }
        }

        public static SQLiteConnection OpenConnection()
        {
            var connection = new SQLiteConnection("Data Source=" + DbFile);
            connection.Open();

            return connection;
        }
    }
}
