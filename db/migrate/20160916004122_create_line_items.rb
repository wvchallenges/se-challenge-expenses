class CreateLineItems < ActiveRecord::Migration[5.0]
  def change
    create_table :line_items do |t|
      t.date :item_date
      t.string :item_name
      t.float :item_amount

      t.timestamps
    end
  end
end
