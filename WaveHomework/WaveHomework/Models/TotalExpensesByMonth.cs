namespace WaveHomework.Models
{
    public class TotalExpensesByMonth
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public decimal Total { get; set; }

        public TotalExpensesByMonth(int year, int month, decimal total)
        {
            Year = year;
            Month = month;
            Total = total;
        }
    }
}