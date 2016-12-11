using System;
using System.Collections.Generic;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace CSVisualizer.Models {

    class ExpenseFactory {
    private IDbConnectionFactory _dbFactory;
    public ExpenseFactory(IDbConnectionFactory dbFactory ){
        _dbFactory=dbFactory;
        using (var db = _dbFactory.Open()){
            if(db==null)
               System.Console.WriteLine("Database not working!");
        }
        
    }
    public void setupTables(){
        using (var db = _dbFactory.Open()){
            
            db.CreateTableIfNotExists<Employee>();
            db.CreateTableIfNotExists<ExpenseType>();
            db.CreateTableIfNotExists<TaxType>();
            db.CreateTableIfNotExists<EmployeeExpense>();
          

            }
        }
    public void SaveExpense(ExpenseTemp expTemp){
        //Setting the values for each class

        //Employee object for Employee Table
        Employee employee = new Employee();
        employee.EmployeeName = expTemp.employee_name;
        employee.EmployeeAddress = expTemp.employee_address;

        //ExpenseType object for ExpenseType Table
        ExpenseType expType = new ExpenseType();
        expType.ExpenseCategory = expTemp.category;

        //TaxType object for TaxType Table
        TaxType taxType = new TaxType();
        taxType.TaxName = expTemp.tax_name;
        
        //EmployeeExpense object for EmployeeExpense Table
        EmployeeExpense empExpense =  new EmployeeExpense();
        empExpense.ExpenseDate = DateTime.Parse(expTemp.date);
        empExpense.PreTaxAmnt = decimal.Parse(expTemp.pre_tax_amount);
        empExpense.TaxAmnt = decimal.Parse(expTemp.tax_amount);
       
           using (var db = _dbFactory.Open()){
               int employeeIDTemp =0;
               int expenseIDTemp =0;
               int taxIDTemp =0;

               Employee employeeRecord = db.Single<Employee>(x=> x.EmployeeName== employee.EmployeeName); 
               if(employeeRecord ==null){
                  db.Save(employee);
                  employeeIDTemp=employee.EmployeeID;
               }
               else{
                   employeeIDTemp = employeeRecord.EmployeeID;
               }
              ExpenseType expenseTypeRecord = db.Single<ExpenseType>(x=>x.ExpenseCategory==expType.ExpenseCategory);
               
               if(expenseTypeRecord==null){
                    db.Save(expType);
                    expenseIDTemp = expType.ExpenseTypeID;
               }
               else{
                expenseIDTemp= expenseTypeRecord.ExpenseTypeID;
               }
                
             TaxType taxTypeRecord  = db.Single<TaxType>(x=>x.TaxName ==taxType.TaxName );
             if(taxTypeRecord==null){
                   db.Save(taxType);
                   taxIDTemp = taxType.TaxTypeID;
             }
             else {
                 taxIDTemp=taxTypeRecord.TaxTypeID;
             }
              

               db.Save(new EmployeeExpense{
                EmployeeID = employeeIDTemp,
                ExpenseTypeID = expenseIDTemp,
                TaxID = taxIDTemp,
                ExpenseDate= empExpense.ExpenseDate,
                PreTaxAmnt = empExpense.PreTaxAmnt,
                TaxAmnt = empExpense.TaxAmnt
             });


           }

    }


    public List<MonthlyExpense> GetMonthlyExpnese(){
        List<MonthlyExpense> expenseResults  = new List<MonthlyExpense>();
    Dictionary<string,decimal> tempResults = new  Dictionary<string,decimal>();
        using (var db = _dbFactory.Open()){

            var MonthlyExpense = db.From<EmployeeExpense>()
            .GroupBy(x => x.ExpenseDate)
            .OrderBy("1")
            .Select(x => new { x.ExpenseDate,  Expense = Sql.Sum(x.PreTaxAmnt+x.TaxAmnt) });

            Dictionary<DateTime, decimal> resultsExpenseDB = db.Dictionary<DateTime, decimal>(MonthlyExpense);
           
            string month= string.Empty;
            foreach(KeyValuePair<DateTime,decimal> item in resultsExpenseDB ){
                    month = item.Key.ToString("MMM-yyyy");
                    if(!tempResults.ContainsKey(month)){
                        tempResults.Add( month,item.Value);
                    }
                    else{
                        tempResults[month]+=item.Value;
                    }
                }
                MonthlyExpense expenseObject;
            foreach(KeyValuePair<string,decimal> item in tempResults){
                expenseObject = new MonthlyExpense(item.Key,item.Value);
                expenseResults.Add(expenseObject);
            }


        }
       
        return expenseResults;

    } 


    }
    
}
