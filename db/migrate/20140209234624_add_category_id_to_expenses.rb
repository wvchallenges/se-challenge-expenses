class AddCategoryIdToExpenses < ActiveRecord::Migration
  def change
    add_reference :expenses, :category, index: true
  end
end
