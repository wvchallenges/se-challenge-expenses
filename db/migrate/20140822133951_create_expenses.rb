class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
        t.date :date
        t.string :category
        t.string :expense_description
        t.float :pre_tax_amount
        t.string :tax_name
        t.float :tax_amount
        t.belongs_to :employee

        t.timestamps
    end
  end
end
