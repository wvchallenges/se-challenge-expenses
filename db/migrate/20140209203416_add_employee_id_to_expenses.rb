class AddEmployeeIdToExpenses < ActiveRecord::Migration
  def change
    add_reference :expenses, :employee, index: true
  end
end
