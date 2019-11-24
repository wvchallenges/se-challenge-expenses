class AddCsvFileIdToExpenseEntry < ActiveRecord::Migration[5.0]
  def change
    add_column :expense_entries, :csv_file_id, :integer
  end
end
