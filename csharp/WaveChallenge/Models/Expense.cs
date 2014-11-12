using System;

namespace WaveChallenge.Models
{
    public class Expense
    {
        public string Id { get; set; }

        public string EmployeeId { get; set; }

        public DateTime Date { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public decimal PreTaxAmount { get; set; }

        public string TaxName { get; set; }

        public decimal TaxAmount { get; set; }

    }
}