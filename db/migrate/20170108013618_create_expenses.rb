class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.datetime :date
      t.string :description
      t.decimal :pretax_amount
      t.decimal :tax_amount
      t.decimal :total_amount
      t.references :employee, index: true, foreign_key: true
      t.references :category, index: true, foreign_key: true
      t.references :tax, index: true, foreign_key: true
    end
  end
end
