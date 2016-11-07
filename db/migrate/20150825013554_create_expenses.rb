class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date      :date, null: false
      t.column    :category, :integer, default: 0, null: false
      t.string    :employee_name, null: false
      t.string    :employee_address, null: false
      t.string    :expense_description, null: false
      t.decimal   :pre_tax_amount, :precision => 12, :scale => 2, null: false
      t.column    :tax_name, :integer, default: 0, null: false
      t.decimal   :tax_amount, :precision => 12, :scale => 2, null: false
      t.index     :date
    end
  end
end
