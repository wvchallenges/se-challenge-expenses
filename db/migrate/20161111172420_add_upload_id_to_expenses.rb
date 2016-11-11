class AddUploadIdToExpenses < ActiveRecord::Migration[5.0]
  def up
    add_column :expenses, :upload_id, :integer

    default_upload = Upload.find_or_create_by file_name: 'default_for_old_expenses'
    Expense.update_all upload_id: default_upload.id
  end

  def down
    remove_column :expenses, :upload_id, :integer
  end
end
