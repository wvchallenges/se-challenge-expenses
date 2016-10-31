using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wave.Employee.BusinessLogic.BusinessModels
{
    public class WaveBrokerMessage
    {
        public string ConnectionId { get; set; }
        public List<Expense> ExpensesToProcess { get; set; }
    }
}
