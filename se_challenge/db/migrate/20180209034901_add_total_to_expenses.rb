class AddTotalToExpenses < ActiveRecord::Migration[5.1]
  def change
    add_column :expenses, :total, :float
  end
end
