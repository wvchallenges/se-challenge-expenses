class CreateEmployees < ActiveRecord::Migration
  def change
    # creating employee table and a 
    # combination of name and address are the unique identifiers for an employee
    create_table :employees do |t|
        t.string :name
        t.string :address
        
        t.timestamps
    end
  end
end
