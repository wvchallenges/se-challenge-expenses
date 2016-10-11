using System.Data.Entity;

namespace WaveHomework.Models
{
    public class WaveContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public WaveContext() : base("name=WaveContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>().Property(x => x.PretaxAmount).HasPrecision(19, 4);
            modelBuilder.Entity<Expense>().Property(x => x.TaxAmount).HasPrecision(19, 4);

            base.OnModelCreating(modelBuilder);
        }

        public System.Data.Entity.DbSet<Models.Expense> Expenses { get; set; }
    }
}