class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.string :category
      t.references :employee, index: true, foreign_key: true
      t.string :description
      t.decimal :amount
      t.string :tax_name
      t.decimal :tax_amount

      t.timestamps null: false
    end
  end
end
