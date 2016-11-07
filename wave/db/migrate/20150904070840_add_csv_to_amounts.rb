class AddCsvToAmounts < ActiveRecord::Migration
  def change
    add_column :amounts, :csv, :string
  end
end
