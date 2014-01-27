class AddDateToExpense < ActiveRecord::Migration
  def change
	  add_column :expenses, :date, :date
  end
end
