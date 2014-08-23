class Expense < ActiveRecord::Base
    belongs_to :employee
      # takes in the file and stores each row as an expense 
    def self.add_expenses_from_csv( csv_file )
        # total expense for current list
        total_expense = 0 
        # iterates through the csv rows and adds them as expenses
        csv_file.each do |row| 
            # this parses the date 

                row = row.to_hash
                #first we find if employee exist in database if true then we just use the employee add to reference in the expense 
                employee_info = Employee.where(name: row["employee name"], address: row["employee address"]).first

                # else we create a new employee
                if ! employee_info
                    employee_info = Employee.new
                    employee_info.name = row["employee name"]
                    employee_info.address = row["employee address"]
                    employee_info.save

                end

                expense = Expense.new                 
                date_parts = row["date"].split('/')
                expense.date = date_parts[1] + '/' + date_parts[0] +'/' + date_parts[2]
                expense.category = row["category"]
                expense.expense_description = row["expense description"]
                expense.pre_tax_amount = row["pre-tax amount"].gsub(',' , '')
                expense.tax_name = row["tax name"].gsub(',' , '')
                expense.tax_amount = row["tax amount"].gsub(',' , '')
                expense.employee_id = employee_info.id
                expense.save

                total_expense = total_expense + expense.pre_tax_amount +  expense.tax_amount 
            end
            # returns total expenses I know ruby returns the last assigned variable but I'd rather be safe than sorry 
            return total_expense
    end

    # calculates the expense per month of year and returns a list of year month expense
    def self.get_monthly_and_year_expenses
        expesnes = Expense.all
        month_and_expense = []
        expesns_month = expesnes.group_by{ |e| e.date.to_formatted_s(:month_and_year) }
        expesns_month.each do  |key, value| 
            current_month = Hash.new 
            current_month[:time] = key
            current_month[:expense] = 0 
            value.each { |exp| current_month[:expense]+=exp.pre_tax_amount }
            month_and_expense << current_month
        end
        return month_and_expense
    end

     # calculates the expense per month and returns a list of  month expense
    def self.get_monthly_expenses
        expesnes = Expense.all
        month_and_expense = []
        expesns_month = expesnes.group_by{ |e| e.date.month }
        expesns_month.each do  |key, value| 
            current_month = Hash.new 
            current_month[:time] = key
            current_month[:expense] = 0 
            value.each { |exp| current_month[:expense]+=exp.pre_tax_amount }
            month_and_expense << current_month
        end
        return month_and_expense
    end

    # calculates all the expenses for all employees in the database
    def self.get_expenses 
        total_expense = 0 
        expenses = Expense.all
        expenses.each do | expense |
              total_expense = total_expense + expense.pre_tax_amount  + expense.tax_amount
        end
        return total_expense 
    end
    # gets the amount of taxes paid
    def self.tax_amount_total
        tax_amount_total = 0 
        expenses = Expense.all
        expenses.each do | expense |
              tax_amount_total = tax_amount_total  + expense.tax_amount
        end
        return tax_amount_total 
    end
    # gets expenses before taxes apply
    def self.get_pre_tax_amount_total
        total_pre_tax_amount_total = 0 
        expenses = Expense.all
        expenses.each do | expense |
              total_pre_tax_amount_total = total_pre_tax_amount_total + expense.pre_tax_amount
        end
        return total_pre_tax_amount_total 
    end
end
