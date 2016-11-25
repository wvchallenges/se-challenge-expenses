class AddAttachmentFileToCsvFiles < ActiveRecord::Migration
  def self.up
    change_table :csv_files do |t|
      t.attachment :file
    end
  end

  def self.down
    remove_attachment :csv_files, :file
  end
end
