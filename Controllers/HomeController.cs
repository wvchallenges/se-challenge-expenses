
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using ServiceStack;
using CSVisualizer.Models;
using ServiceStack.Data;


namespace CSVisualizer.Controllers
{
    public class HomeController : Controller
    {
        private IHostingEnvironment _environment;
        private IDbConnectionFactory _dbFactory;

        private readonly string uploadDir = "uploadedFiles";
        public HomeController(IHostingEnvironment environment, IDbConnectionFactory dbFacotry)
        {
            _dbFactory=dbFacotry;
            _environment = environment;
            //Setting up tables
            ExpenseFactory expFactory = new ExpenseFactory(_dbFactory);
            expFactory.setupTables();
            string dir = Path.Combine(_environment.WebRootPath,uploadDir);
            if (!System.IO.Directory.Exists(dir))
            {
                System.IO.Directory.CreateDirectory(dir);
            }
        }
        [HttpGet]
        public IActionResult Index()
        {
            ViewData["Title"] = "CSVisualizer";
            ExpenseFactory expFactory = new ExpenseFactory(_dbFactory);
            List<MonthlyExpense> modelExpense =expFactory.GetMonthlyExpnese();
            if(modelExpense == null)
            {
                modelExpense =  new List<MonthlyExpense>();
            }
            return View("Index",modelExpense);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Acknowledgements:";

            return View();
        }

        [HttpPost]
         public IActionResult SaveFileUpload(IFormFile file){
  
       
            string uploadedFiles = Path.Combine(_environment.WebRootPath,uploadDir);
            if(file.Length>0)
               {
                   
                   string filePath = Path.Combine(uploadedFiles,file.FileName);
                   using (var fileStream = new FileStream(filePath, FileMode.Create)){
                            file.CopyTo(fileStream);
                   }
                    List<ExpenseTemp> expenses = new List<ExpenseTemp>();
                    expenses= System.IO.File.ReadAllText(filePath).FromCsv<List<ExpenseTemp>>();
                    ExpenseFactory expFactory = new ExpenseFactory(_dbFactory);
                    
                    foreach(ExpenseTemp expenseItem in expenses){
                           expFactory.SaveExpense(expenseItem);
                    }
                }
         
        ModelState.Clear();
        return RedirectToAction("Index");
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
