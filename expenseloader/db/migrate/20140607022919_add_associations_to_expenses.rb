class AddAssociationsToExpenses < ActiveRecord::Migration
  def change
    add_column :expenses, :employee_id, :integer
    add_column :expenses, :category_id, :integer
  end
end
