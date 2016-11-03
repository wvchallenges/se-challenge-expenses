using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wave.Employee.BusinessLogic.Interfaces
{
    public interface IFileProcessingLogic
    {
        
        Dictionary<int, decimal> ProcessExpenseParallely(List<Expense> expenses, int rows, string connectionId);
    }
}
