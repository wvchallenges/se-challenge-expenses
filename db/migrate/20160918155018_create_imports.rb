class CreateImports < ActiveRecord::Migration[5.0]
  def change
    create_table :imports do |t|
      t.string :original_filename
      t.string :uploaded_file

      t.timestamps
    end
  end
end
