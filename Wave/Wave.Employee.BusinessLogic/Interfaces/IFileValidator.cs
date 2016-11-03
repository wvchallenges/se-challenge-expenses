using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Wave.Employee.BusinessLogic.Interfaces
{
    public interface IFileValidator
    {
        bool IsFileValid(HttpContentHeaders headers);
    }
}
