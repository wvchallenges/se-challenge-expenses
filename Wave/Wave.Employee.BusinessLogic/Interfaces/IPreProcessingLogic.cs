using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wave.Employee.BusinessLogic.Interfaces
{
    public interface IPreProcessingLogic
    {
        Task ProcessFileContentWithServiceBus(string fileContent, string connectionId);
    }
}
