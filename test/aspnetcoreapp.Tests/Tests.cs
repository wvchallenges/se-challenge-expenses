using System;
using Xunit;
using WebApplication.Services;
using WebApplication.Models;
namespace Tests
{
    public class Tests
    {
        private const string expenseConvertError = "Error reading expense column data on line: {0}";
		private const string preTaxAmountConvertError = "Error reading pre tax amount column data on line: {0}";
		private const string taxtAmountConvertError = "Error reading tax amount on line: {0}";
		private const string invalidNumberOfColumnsError = "The csv file does not contain the correct number of columns";
        private const string correctExpense = @"12/1/2013,Travel,Don Draper,""783 Park Ave, New York, NY 10021"",Taxi ride, 350.00 ,NY Sales tax, 31.06";
        private const string shortLine = @"Taxi ride, 350.00 ,NY Sales tax, 31.06";
        private const string badDate = @"12013,Travel,Don Draper,""783 Park Ave, New York, NY 10021"",Taxi ride, 350.00 ,NY Sales tax, 31.06";
        private const string badPreTax = @"12/1/2013,Travel,Don Draper,""783 Park Ave, New York, NY 10021"",Taxi ride, whut ,NY Sales tax, 31.06";
        private const string badTax = @"12/1/2013,Travel,Don Draper,""783 Park Ave, New York, NY 10021"",Taxi ride, 350.00 ,NY Sales tax, huh";
        
        [Fact]
        public void open_correct_expense() 
        {
            CsvImporter importer = new CsvImporter();
            var expense = importer.CreateCsvImport(correctExpense, 1);
            var testExpense = new Expense(){
                Date = new DateTime(2013, 12, 1),
                Category = "Travel",
                EmployeeName = "Don Draper",
                EmployeeAddress = "783 Park Ave, New York, NY 10021",
                ExpenseDescription = "Taxi ride",
                PreTaxAmount = 350.0,
                TaxName = "NY Sales tax",
                TaxAmount = 31.06
            };
            Assert.True(expense.Date.Equals(testExpense.Date));
            Assert.True(expense.Category.Equals(testExpense.Category));
            Assert.True(expense.EmployeeName.Equals(testExpense.EmployeeName));
            Assert.True(expense.EmployeeAddress.Equals(testExpense.EmployeeAddress));
            Assert.True(expense.ExpenseDescription.Equals(testExpense.ExpenseDescription));
            Assert.True(expense.PreTaxAmount.Equals(testExpense.PreTaxAmount));
            Assert.True(expense.TaxName.Equals(testExpense.TaxName));            
            Assert.True(expense.TaxAmount.Equals(testExpense.TaxAmount));
        }

        [Fact]
        public void open_short_line()
        {
            CsvImporter importer = new CsvImporter();
            var ex = Assert.Throws<CsvImportException>(() => importer.CreateCsvImport(shortLine, 1));
            Assert.Equal(ex.Message, invalidNumberOfColumnsError);

            ex = Assert.Throws<CsvImportException>(() => importer.CreateCsvImport(badDate, 1));
            Assert.Equal(ex.Message, string.Format(expenseConvertError, 1));

            ex = Assert.Throws<CsvImportException>(() => importer.CreateCsvImport(badPreTax, 1));
            Assert.Equal(ex.Message, string.Format(preTaxAmountConvertError, 1));

            ex = Assert.Throws<CsvImportException>(() => importer.CreateCsvImport(badTax, 1));
            Assert.Equal(ex.Message, string.Format(taxtAmountConvertError, 1));
        }
    }
}
