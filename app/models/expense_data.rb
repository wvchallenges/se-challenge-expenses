class ExpenseData

  EXPENSE_COLUMNS = {
    date: { position: 0, type: :date },
    category: { position: 1 },
    employee_name: { position: 2 },
    employee_address: { position: 3 },
    description: { position: 4 },
    pretax_amount: { position: 5, type: :decimal },
    tax_name: { position: 6 },
    tax_amount: { position: 7, type: :decimal }
  }

  def initialize(expense_row)
    @expense_row = expense_row
  end

  EXPENSE_COLUMNS.each do |column_name, column_info|
    define_method column_name do
      value = @expense_row[column_info[:position]]
      parse_value(value, column_info[:type])
    end
  end

  def total_amount
    pretax_amount + tax_amount
  end

  def tax_percentage
    tax_amount / pretax_amount
  end

  private

  def parse_value(value, type)
    case type
    when :decimal
      value.gsub(',','').to_d
    when :date
      DateTime.strptime(value, '%m/%d/%Y')
    else
      value
    end
  end
end
