class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.date :date
      t.text :description
      t.decimal :pre_tax_amount
      t.decimal :tax_amount
      t.references :employee, foreign_key: true
      t.references :category, foreign_key: true
      t.references :tax_name, foreign_key: true

      t.timestamps
    end
  end
end
