using Microsoft.AspNet.SignalR.Client;
using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wave.Employee.BusinessLogic.Interfaces;
using Wave.Employee.DataAccess;

namespace Wave.Employee.BusinessLogic
{
    public class PreProcessingLogic : IPreProcessingLogic
    {
        string _serviceBusConnectionString;
        private NamespaceManager _namespaceManager;

        public PreProcessingLogic()
        {
            _serviceBusConnectionString = ConfigurationManager.ConnectionStrings["ServiceBus"].ConnectionString;
            _namespaceManager = NamespaceManager.CreateFromConnectionString(_serviceBusConnectionString);
        }

        public async Task ProcessFileContentWithServiceBus(string fileContent, string connectionId)
        {
            List<Expense> expenses = new List<Expense>();
            fileContent = fileContent.Replace('\n', '\r');
            string[] lines = fileContent.Split(new char[] { '\r' }, StringSplitOptions.RemoveEmptyEntries);

            // See how many rows and columns there are.
            int rows = lines.Length;
            int cols = lines[0].Split(',').Length;

            // Allocate the data array.
            string[,] values = new string[rows, cols];

            // Load the array.
            for (int r = 1; r < rows; r++)
            {
                Expense expense = ProcessALine(lines[r]);
                expenses.Add(expense);
            }

            BrokeredExpense be = new BrokeredExpense { Expenses = expenses, ConnectionId = connectionId };

            var client = await this.GetQueueClient("expensequeue");
            var message = new BrokeredMessage(be);
            client.Send(message);
        }

        private async Task<QueueClient> GetQueueClient(string queueName)
        {
            if (!string.IsNullOrEmpty(queueName) && !_namespaceManager.QueueExists(queueName))
            {
                await _namespaceManager.CreateQueueAsync(queueName);
            }

            return QueueClient.CreateFromConnectionString(_serviceBusConnectionString, queueName);
        }

        private Expense ProcessALine(string line)
        {
            try
            {
                string[] lineData = line.Split(',');
                Expense expense = new Expense
                {
                    Date = lineData[0],
                    Category = lineData[1],
                    EmployeeName = lineData[2],
                    EmployeeAddress = (lineData[3] + ", " + lineData[4] + ", " + lineData[5]).Replace("\"", ""),
                    ExpenseDescription = lineData[6],
                    PretaxAmount = Convert.ToDecimal(lineData[7].Replace("\"", "")),
                    TaxName = lineData[8],
                    TaxAmount = Convert.ToDecimal(lineData[9].Replace("\"", ""))
                };
                return expense;
            }
            catch (Exception ex)
            {
                //continue if any exception occur
                return null;
            }
        }
        
    }
}
