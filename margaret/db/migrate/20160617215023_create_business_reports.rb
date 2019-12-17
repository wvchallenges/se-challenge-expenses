class CreateBusinessReports < ActiveRecord::Migration
  def change
    create_table :business_reports do |t|
      t.integer :business_id, null: false
      t.timestamps
    end

    add_index :business_reports, :business_id
    add_foreign_key :business_reports, :businesses
  end
end
