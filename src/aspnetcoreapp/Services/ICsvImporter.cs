using System;
using System.Collections.Generic;
using WebApplication.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Linq;

namespace WebApplication.Services
{
	public interface ICsvImporter
	{
		IList<Expense> ReadCsvFile(IFormFile file);
	}

	public class CsvImporter : ICsvImporter
	{
		private const int columnNumber = 8;

		private const string expenseConvertError = "Error reading expense column data on line: {0}";
		private const string preTaxAmountConvertError = "Error reading pre tax amount column data on line: {0}";
		private const string taxtAmountConvertError = "Error reading tax amount on line: {0}";
		private const string invalidNumberOfColumnsError = "The csv file does not contain the correct number of columns";
		public IList<Expense> ReadCsvFile (IFormFile file)
		{
			var csvImports = new List<Expense>();
			int lineNumber = 0;
			bool skipFirstLine = true;
			

			using (var reader = new StreamReader(file.OpenReadStream()))
			{
				while (!reader.EndOfStream)
				{

					string line = reader.ReadLine();
					lineNumber += 1;
					if (skipFirstLine)
					{
						skipFirstLine = false;
						continue;
					}
					var csvImport = CreateCsvImport(line, lineNumber);
					csvImports.Add(csvImport);
				}
			}

			return csvImports;
		}

		public Expense CreateCsvImport(string line, int lineNumber)
		{
			// http://stackoverflow.com/a/25756010
			var fields = new Regex("((?<=\")[^\"]*(?=\"(,|$)+)|(?<=,|^)[^,\"]*(?=,|$))").Matches(line)
				.Cast<Match>()
				.Select(m => m.Value)
				.ToArray();

			if (fields.Length != columnNumber)
			{
				throw new CsvImportException(invalidNumberOfColumnsError);
			}


			var csvImport = new Expense();

			var expenseDate = new DateTime();
			var preTaxAmount = new double();
			var taxAmount = new double();

			if (DateTime.TryParse(fields[0].Replace(",", ""), out expenseDate))
			{
				csvImport.Date = expenseDate;
			}
			else
			{
				throw new CsvImportException(string.Format(expenseConvertError, lineNumber));
			}

			csvImport.Category = fields[1];
			csvImport.EmployeeName = fields[2];
			csvImport.EmployeeAddress = fields[3];
			csvImport.ExpenseDescription = fields[4];

			if (Double.TryParse(fields[5], NumberStyles.Any, CultureInfo.InvariantCulture, out preTaxAmount))
			{
				csvImport.PreTaxAmount = preTaxAmount;
			}
			else
			{
				throw new CsvImportException(string.Format(preTaxAmountConvertError, lineNumber));
			}

			csvImport.TaxName = fields[6];
			
			if (Double.TryParse(fields[7], NumberStyles.Any,
				 CultureInfo.InvariantCulture, out taxAmount))
			{
				csvImport.TaxAmount = taxAmount;
			}
			else
			{
				throw new CsvImportException(string.Format(taxtAmountConvertError, lineNumber));
			}

			return csvImport;
		}
	}
}
