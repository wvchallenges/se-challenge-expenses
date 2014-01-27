class AddEntireAddressToEmployee < ActiveRecord::Migration
  def change
	  add_column :employees, :full_address, :string
  end
end
