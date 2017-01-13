using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Services;
using WebApplication.Data;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
	{

		private readonly ICsvImporter _csvImporter;
		private readonly IExpenseRepository _expenseRepository;

		public HomeController(ICsvImporter csvImporter, IExpenseRepository expenseRepository)
		{
			_csvImporter = csvImporter;
			_expenseRepository = expenseRepository;
		}

		public IActionResult Index()
		{
			// The view being returned is calculated based on the name of the
			// controller (Home) and the name of the action method (Index).
			// So in this case, the view returned is /Views/Home/Index.cshtml.
			return View();
		}		

		[HttpPost]
		public ActionResult Upload(IFormFile file)
		{
			try
			{
				var expenses = _csvImporter.ReadCsvFile(file);
				_expenseRepository.SaveExpenses(expenses);
			}
			catch (CsvImportException e)
			{
				ViewData["error"] = e.Message;
				return View("Index");
			}
			catch(Exception e)
			{
				ViewData["error"] = e.Message;
				return View("Index");
			}
			return RedirectToAction("Expense");
		}

		public IActionResult Expense()
		{
			// Creates a model and passes it on to the view.
			var expenseViewModels = _expenseRepository.GetExpenseReport();

			return View(expenseViewModels);
		}
	}
}
