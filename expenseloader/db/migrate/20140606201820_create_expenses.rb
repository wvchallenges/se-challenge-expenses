class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.string :description
      t.date :purchase_date
      t.integer :pre_tax_amount
      t.integer :tax_amount
      t.string :tax_name

      t.timestamps
    end
  end
end
