class CreateCsvfiles < ActiveRecord::Migration
  def change
    create_table :csvfiles do |t|
      t.string :name

      t.timestamps
    end
  end
end
