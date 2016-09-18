class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.references :category, foreign_key: true
      t.references :employee, foreign_key: true
      t.date :date
      t.string :description
      t.decimal :pretax_amount
      t.string :tax_name
      t.decimal :tax_amount

      t.timestamps
    end
  end
end
