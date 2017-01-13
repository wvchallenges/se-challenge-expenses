using System;

namespace WebApplication.Services
{
	public class CsvImportException : Exception
	{
		public CsvImportException(string message) : base(message) { }
	}
}
