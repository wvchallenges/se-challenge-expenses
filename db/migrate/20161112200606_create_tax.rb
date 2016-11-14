class CreateTax < ActiveRecord::Migration
  def change
    create_table :taxes do |t|
    	t.string :name
    end
  end
end
