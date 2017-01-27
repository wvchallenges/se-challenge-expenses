class AddAttachmentFileToExpensesFiles < ActiveRecord::Migration
  def self.up
    change_table :expenses_files do |t|
      t.attachment :file
    end
  end

  def self.down
    remove_attachment :expenses_files, :file
  end
end
