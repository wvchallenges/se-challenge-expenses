using System;
using System.Runtime.Serialization;
using ServiceStack.DataAnnotations;


namespace CSVisualizer.Models{
    [DataContract]
    public class ExpenseTemp{
        [DataMember]
        [Index(Unique = true)]
        public string date{get;set;}
        [DataMember]
        public string category{get;set;}
        [DataMember(Name="employee name")]
        public string employee_name{get;set;}

        [DataMember(Name="employee address")]
        public string employee_address{get;set;}
        [DataMember(Name="expense description")]
        public string expense_description{get;set;}
        [DataMember(Name="pre-tax amount")]
        public string pre_tax_amount {get;set;}
        [DataMember(Name="tax name")]
        public string tax_name {get;set;}
        [DataMember(Name="tax amount")]
        public string tax_amount{get;set;}


    }

    public class MonthlyExpense{
        public string Month{get;set;}
        public decimal Expense{get;set;}

        public MonthlyExpense(string _month,decimal _expense){
            Month=_month;
            Expense=_expense;
        }


    }
    public class Employee {
        [AutoIncrement]
        [PrimaryKey]
        public int EmployeeID {get;set;}
        public string EmployeeName {get;set;}
        public string EmployeeAddress{get;set;}
 }

    public class ExpenseType {
        [AutoIncrement]
         [PrimaryKey]
        public int ExpenseTypeID {get;set;}
       
        public string ExpenseCategory{get;set;}

     
    }
    public class TaxType {
        [AutoIncrement]
        [PrimaryKey]
        public int TaxTypeID{get;set;}
        public string TaxName{get;set;}
    }

    public class EmployeeExpense{
        [AutoIncrement]
        [PrimaryKey]
        public int EmployeeExpenseID{get;set;}
        [ForeignKey(typeof(Employee))]
        public int EmployeeID{get;set;}
        [ForeignKey(typeof(ExpenseType))]
        public int ExpenseTypeID{get;set;}

        public DateTime ExpenseDate{get;set;}
        [ForeignKey(typeof(TaxType))]
        public int TaxID{get;set;}

        public decimal PreTaxAmnt{get;set;}

        public decimal TaxAmnt {get;set;}

     

    }


}