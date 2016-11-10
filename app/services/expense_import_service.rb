class ExpenseImportService < ApplicationService
  def import(csv_row)
    Expense.create! parse_attributes(csv_row.to_hash)
  end

  def import_file(csv_file)
    csv_file.each do |row|
      import(row)
    end
  end

  private

  def parse_attributes(original_attributes)
    attributes = {}

    attributes.merge! parse_category(original_attributes)
    attributes.merge! parse_employee(original_attributes)
    attributes.merge! parse_tax(original_attributes)

    attributes[:date] = date original_attributes.delete('date')
    attributes[:description] = original_attributes.delete 'expense description'
    attributes[:pre_tax_amount] = original_attributes.delete 'pre-tax amount'
    attributes[:tax_amount] = original_attributes.delete 'tax amount'

    attributes
  end

  def parse_category(original_attributes)
    category_name = original_attributes.delete('category')
    category = Category.find_or_create_by!(name: category_name)
    { category_id: category.id }
  end

  def parse_employee(original_attributes)
    employee_name = original_attributes.delete 'employee name'
    employee_address = original_attributes.delete 'employee address'
    employee = Employee.find_or_create_by!(name: employee_name) do |new_employee|
      new_employee.address = employee_address
    end
    { employee_id: employee.id }
  end

  def parse_tax(original_attributes)
    tax_name = original_attributes.delete 'tax name'
    tax = Tax.find_or_create_by!(name: tax_name)
    { tax_id: tax.id }
  end

  def date(original_date)
    Date.strptime original_date, '%m/%d/%Y'
  end
end
