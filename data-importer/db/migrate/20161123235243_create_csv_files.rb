class CreateCsvFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :csv_files do |t|
      t.timestamps
    end
  end
end
