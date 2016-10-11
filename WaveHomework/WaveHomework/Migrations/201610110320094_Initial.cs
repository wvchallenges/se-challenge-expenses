namespace WaveHomework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Expenses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Category = c.String(),
                        EmployeeName = c.String(),
                        EmployeeAddress = c.String(),
                        ExpenseDescription = c.String(),
                        PretaxAmount = c.Decimal(nullable: false, precision: 19, scale: 4),
                        TaxName = c.String(),
                        TaxAmount = c.Decimal(nullable: false, precision: 19, scale: 4),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Expenses");
        }
    }
}
