class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.text :expense_description
      t.integer :pretax_amount
      t.integer :tax_amount
      t.date :date
      t.references :tax, foreign_key: true
      t.references :category, foreign_key: true
      t.references :employee, foreign_key: true
      t.references :csv_file, foreign_key: true

      t.timestamps
    end
  end
end
