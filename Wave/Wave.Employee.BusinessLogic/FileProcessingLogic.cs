using Microsoft.AspNet.SignalR.Client;
using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlTypes;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;

using System.Text;
using System.Threading.Tasks;
using Wave.Employee.BusinessLogic.BusinessModels;
using Wave.Employee.BusinessLogic.Interfaces;
using Wave.Employee.DataAccess;

namespace Wave.Employee.BusinessLogic
{
    public class FileProcessingLogic : IFileProcessingLogic
    {
        int MaxThreads;
        object lockObject = new object();
        string connectionId;
        int completed = 0;
        int total = 0;
        public FileProcessingLogic()
        {
            MaxThreads = Convert.ToInt32(ConfigurationManager.AppSettings["MaxThreads"]);
        }
        
        public Dictionary<int, decimal> ProcessExpenseParallely(List<Expense> expenses, int rows, string connectionId)
        {
            total = expenses.Count;
            this.connectionId = connectionId;
            UpdateStatus(connectionId, Status.ProcessingStarted);
            
            //Migrate Data Parallely
            Task<Dictionary<int, decimal>>[] tasks;
            if (rows >= MaxThreads)
            {
                tasks = new Task<Dictionary<int, decimal>>[MaxThreads];
            }
            else
            {
                tasks = new Task<Dictionary<int, decimal>>[rows];
            }

            int batchSize = expenses.Count / tasks.Length;
            for (int i = 0; i < tasks.Length; i++)
            {
                int index = i * batchSize;
                List<Expense> batchExpenses = null;
                if (i == tasks.Length - 1)
                {
                    //for last batch, get all remaining items
                    batchSize = expenses.Count - index;
                }
                batchExpenses = expenses.GetRange(index, batchSize);
                tasks[i] = new Task<Dictionary<int, decimal>>(() => MigrateData(batchExpenses));
            }

            System.Console.WriteLine("Start Time:" + DateTime.Now.Minute + " : " + DateTime.Now.Second);
            foreach (Task task in tasks)
            {
                task.Start();
            }
            Task.WaitAll(tasks);
            System.Console.WriteLine("End Time:" + DateTime.Now.Minute + " : " + DateTime.Now.Second);
            Dictionary<int, decimal> result = tasks[0].Result;
            for (int i = 1; i < tasks.Length; i++)
            {
                foreach (var key in tasks[i].Result.Keys)
                {
                    if (result.ContainsKey(key))
                    {
                        result[key] = result[key] + tasks[i].Result[key];
                    }
                    else
                    {
                        result[key] = tasks[i].Result[key];
                    }
                }
            }

            UpdateStatus(connectionId, Status.ProcessingCompleted);
            UpdateResult(connectionId, MapMonthlyExpense(result));
           
            return result;
        }

        private List<MonthlyExpense> MapMonthlyExpense(Dictionary<int, decimal> result)
        {
            List<MonthlyExpense> monthlyExpenses = null;
            if (result != null)
            {
                monthlyExpenses = new List<MonthlyExpense>();
                foreach (var key in result.Keys)
                {
                    MonthlyExpense monthlyExpense = new MonthlyExpense
                    {
                        Month = key,
                        TotalExpense = result[key]
                    };
                    monthlyExpenses.Add(monthlyExpense);
                }
            }
            return monthlyExpenses;
        }

        private Dictionary<int, decimal> MigrateData(List<Expense> expenses)
        {
            Dictionary<int, decimal> totalExpenseByMonth = new Dictionary<int, decimal>();
            if (expenses != null && expenses.Count > 0)
            {
                List<DataAccess.Expense> dbExpenses = new List<DataAccess.Expense>();
                try
                {
                    using (var dbContext = new Wave_X1_MainEntities())
                    {
                        foreach (var expense in expenses)
                        {
                            int employeeId = GetOrSetEmployeeRecord(dbContext, expense.EmployeeName, expense.EmployeeAddress);
                            int expenseCategoryId = GetOrSetExpenseCategory(dbContext, expense.Category);
                            int taxId = GetOrSetTaxState(dbContext, expense.TaxName);

                            DataAccess.Expense dbExpense = new DataAccess.Expense
                            {
                                EmployeeId = employeeId,
                                ExpenseCategoryId = expenseCategoryId,
                                TaxStateId = taxId,
                                ExpenseDescription = expense.ExpenseDescription,
                                PreTaxAmount = expense.PretaxAmount,
                                TaxAmount = expense.TaxAmount,
                            };
                            DateTime dt;

                            bool isDateTime = DateTime.TryParse(expense.Date, out dt);
                            if (isDateTime)
                            {
                                dbExpense.SubmissionDate = dt;
                            }
                            else
                            {
                                string sqlMinDt = SqlDateTime.MinValue.ToString();
                                dbExpense.SubmissionDate = Convert.ToDateTime(sqlMinDt);
                            }
                            if (totalExpenseByMonth.ContainsKey(dt.Month))
                            {
                                totalExpenseByMonth[dt.Month] = totalExpenseByMonth[dt.Month] + expense.TotalExpenseAmount;
                            }
                            else
                            {
                                totalExpenseByMonth[dt.Month] = expense.TotalExpenseAmount;
                            }

                            dbExpenses.Add(dbExpense);

                            lock (lockObject)
                            {
                                completed = completed + 1;
                                
                                
                            }

                            System.Console.WriteLine("Processing Completed:" + completed);
                            UpdateMigrationProgress(total, completed);
                        }

                        dbContext.Expenses.AddRange(dbExpenses);
                        dbContext.SaveChanges();
                    }
                }
                catch (Exception ex)
                {

                }
            }
            return totalExpenseByMonth;
        }

        private int GetOrSetEmployeeRecord(Wave_X1_MainEntities dbContext, string employeeName, string address)
        {
            var names = employeeName.Split(new char[] { ' ' });
            string firstName = names[0];
            string lastName = names[1];

            var emp = dbContext.Employees.Where(x => x.FirstName == firstName && x.LastName == lastName).FirstOrDefault();
            if (emp == null)
            {
                DataAccess.Employee newEmployee = new DataAccess.Employee
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Address = address,
                    CreatedDate = DateTime.Now
                };

                dbContext.Employees.Add(newEmployee);
                dbContext.SaveChanges();
                return newEmployee.EmployeeId;
            }
            else
            {
                return emp.EmployeeId;
            }
        }

        private int GetOrSetExpenseCategory(Wave_X1_MainEntities dbContext, string expenseCategory)
        {
            var cat = dbContext.ExpenseCategories.Where(x => x.CategoryName == expenseCategory).FirstOrDefault();
            if (cat == null)
            {
                DataAccess.ExpenseCategory category = new DataAccess.ExpenseCategory
                {
                    CategoryName = expenseCategory
                };

                dbContext.ExpenseCategories.Add(category);
                dbContext.SaveChanges();
                return category.CategoryId;
            }
            else
            {
                return cat.CategoryId;
            }
        }

        private int GetOrSetTaxState(Wave_X1_MainEntities dbContext, string taxName)
        {
            string[] states = taxName.Split(new char[] { ' ' });
            string stateCode = states[0];

            var taxState = dbContext.TaxStates.Where(x => x.StateCode == stateCode).FirstOrDefault();
            if (taxState == null)
            {
                DataAccess.TaxState ts = new TaxState
                {
                    StateName = LookUpStateNameFromStateCode(stateCode),
                    StateCode = stateCode
                };
                dbContext.TaxStates.Add(ts);
                dbContext.SaveChanges();
                return ts.StateId;
            }
            else
            {
                return taxState.StateId;
            }
        }

        private string LookUpStateNameFromStateCode(string stateCode)
        {
            switch (stateCode)
            {
                case "NY":
                    return "New York";
                case "CA":
                    return "California";
            }
            return "";
        }


        public async Task UpdateStatus(string connectionId, object payload)
        {
            using (var client = GetWebApiClient())
            {
                await client.GetAsync(string.Format("Upload/UpdateStatus?connectionId={0}&status={1}", connectionId, (int)payload));
            }
        }

        public async Task UpdateMigrationProgress(int total, int completed)
        {
            int completedPercent = (completed * 100) / total;
            System.Console.WriteLine("Notification Sent, payload:" + completedPercent);
            using (var client = GetWebApiClient())
            {
                await client.GetAsync(string.Format("Upload/UpdateMigrationProgress?connectionId={0}&completed={1}", this.connectionId, completedPercent));
            }
        }
        public async Task UpdateResult(string connectionId, object result)
        {
            using (var client = GetWebApiClient())
            {
                List<MonthlyExpense> expense = result as List<MonthlyExpense>;
                var sortedResult = expense.OrderBy(x => x.Month);
                await client.PostAsJsonAsync(string.Format("Upload/UpdateResult?connectionId={0}", connectionId), sortedResult);
            }
        }

        private static HttpClient GetWebApiClient()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.ConnectionStrings["NotificationHubServer"].ConnectionString);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        }
    }
}
