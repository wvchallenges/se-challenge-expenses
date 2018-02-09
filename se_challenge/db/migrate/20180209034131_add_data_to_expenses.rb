class AddDataToExpenses < ActiveRecord::Migration[5.1]
  def change
    add_column :expenses, :data, :jsonb
  end
end
