class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
	    t.belongs_to :employee
	    t.belongs_to :category
	    t.string :description
	    t.float :pre_tax
	    t.string :tax_name
	    t.float :tax_amount


      t.timestamps
    end

  end
end
