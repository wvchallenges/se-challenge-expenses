class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.date :date
      t.references :category
      t.references :employee
      t.text :description
      t.monetize :pre_tax_amount
      t.references :tax
      t.monetize :tax_amount
    end
  end
end
