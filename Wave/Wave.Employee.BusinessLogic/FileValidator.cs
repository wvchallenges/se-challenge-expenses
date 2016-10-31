using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Wave.Employee.BusinessLogic.Interfaces;

namespace Wave.Employee.BusinessLogic
{
    public class FileValidator : IFileValidator
    {
        public bool IsFileValid(HttpContentHeaders headers)
        {
            return true;
            //bool isValid = false;
            //string fileName = headers.ContentDisposition.FileName;
            //string FileExtension = fileName.Substring(fileName.LastIndexOf('.') + 1).ToLower();
            //if (FileExtension == "csv")
            //{
            //    isValid = true;
            //}
            //return isValid;
        }
    }
}
