class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.references :employee, index: true, foreign_key: true, null: false
      t.references :category, index: true, foreign_key: true, null: false
      t.references :tax, index: true, foreign_key: true, null: false
      t.date :date, null: false
      t.string :description
      t.float :pre_tax_amount
      t.float :tax_amount

      t.timestamps null: false


      t.index([:employee_id, :category_id, :tax_id])
    end
  end
end
