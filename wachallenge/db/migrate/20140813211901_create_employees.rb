class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.string :category
      t.string :employee_name
      t.string :employee_address
      t.string :description
      t.string :pre_tax_amount
      t.string :tax_name
      t.string :tax_amount
      t.belongs_to :report, index: true

      t.timestamps
    end
  end
end
