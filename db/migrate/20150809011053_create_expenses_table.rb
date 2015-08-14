class CreateExpensesTable < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date  "date"
      t.string  "category"
      t.string  "employee_name"
      t.string  "employee_address"
      t.string  "expense_description"
      t.float "pretax_amount"
      t.string  "tax_name"
      t.float "tax_amount"
      t.float "total_amount"
    end
  end
end
