using Microsoft.Azure.WebJobs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wave.Employee.BusinessLogic;
using Wave.Employee.BusinessLogic.Interfaces;

namespace Wave.JobProcessing
{
    
    public class CSVExpenseProcessorJob
    {
        private readonly IFileProcessingLogic _migrationLogic;
        public CSVExpenseProcessorJob(IFileProcessingLogic migrationLogic)
        {
            this._migrationLogic = migrationLogic;

        }

        public async Task ProcessQueueMessage([ServiceBusTrigger(Constants.ExpenseQueue)] BrokeredExpense message,
        TextWriter logger)
        {
            logger.WriteLine(message);
            ProcessMessage(message);

        }

        public void ProcessMessage(BrokeredExpense message)
        {
           var resut =  _migrationLogic.ProcessExpenseParallely(message.Expenses, message.Expenses.Count, message.ConnectionId);

        }
    }
}
