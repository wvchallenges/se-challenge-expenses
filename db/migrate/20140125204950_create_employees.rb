class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
	    t.string :name
	    t.integer :street_number
	    t.string :street_name
	    t.string :city
	    t.string :state
	    t.integer :zip_code
      t.timestamps
    end
  end
end
