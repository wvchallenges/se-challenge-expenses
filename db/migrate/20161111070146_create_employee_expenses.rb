class CreateEmployeeExpenses < ActiveRecord::Migration
  def change
    create_table :employee_expenses do |t|
    	t.datetime :date
    	t.belongs_to :category, index: true
    	t.belongs_to :employee, index: true
    	t.string :description
    	t.decimal :pre_tax_amount
    	t.belongs_to :tax, index: true
        t.decimal :tax_amount
    end
  end
end
