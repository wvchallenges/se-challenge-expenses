class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
    	t.string :name
    	t.string :address
    end
  end
end
