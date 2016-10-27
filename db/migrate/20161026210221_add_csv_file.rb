class AddCsvFile < ActiveRecord::Migration[5.0]
  def change
    create_table :csv_files do |t|
      t.string :location, null: true
      t.string :check_id, null: false
      t.string :status, null: false

      t.timestamps
    end
  end
end
