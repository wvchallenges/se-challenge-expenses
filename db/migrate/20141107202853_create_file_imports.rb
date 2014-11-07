class CreateFileImports < ActiveRecord::Migration
  def change
    create_table :file_imports do |t|
      t.string :filename

      t.timestamps
    end
  end
end
