class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.date :date
      t.string :category
      t.string :name
      t.string :address
      t.string :exp_desc
      t.decimal :pre_tax
      t.string :tax_name
      t.decimal :tax_amount

      t.timestamps
    end
  end
end
