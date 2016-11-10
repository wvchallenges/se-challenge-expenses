class ExpenseImportService < ApplicationService
  def import(expense_row)
    Expense.create! parse_attributes(expense_row.to_hash)
  end

  private

  def parse_attributes(original_attributes)
    attributes = {}
    attributes[:date] = date original_attributes.delete('date')
    attributes[:category_id] = category_id original_attributes.delete('category')

    employee_name = original_attributes.delete 'employee name'
    employee_address = original_attributes.delete 'employee address'
    attributes[:employee_id] = employee_id(employee_name, employee_address)

    attributes[:description] = original_attributes.delete 'expense description'
    attributes[:pre_tax_amount] = original_attributes.delete 'pre-tax amount'

    tax_name = original_attributes.delete 'tax name'
    attributes[:tax_id] = tax_id(tax_name)

    attributes[:tax_amount] = original_attributes.delete 'tax amount'

    attributes
  end

  def date(original_date)
    Date.strptime original_date, '%m/%d/%Y'
  end

  def category_id(category_name)
    Category.find_or_create_by!(name: category_name).id
  end

  def employee_id(employee_name, employee_address)
    Employee.find_or_create_by!(name: employee_name) do |new_employee|
      new_employee.address = employee_address
    end.id
  end

  def tax_id(tax_name)
    Tax.find_or_create_by!(name: tax_name).id
  end
end
