class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.datetime :occurance_date, null: false
      t.text :description, null: false
      t.float :pre_tax_amount, null: false
      t.float :tax_amount, null: false
      t.string :tax_type, null: false

      t.belongs_to :employee, index: true, unique: true, foreign_key: true, null: false
      t.belongs_to :category, index: true, unique: true, foreign_key: true, null: false
    end
  end
end
