class CreateBusinessReportEntries < ActiveRecord::Migration
  def change
    create_table :business_report_entries do |t|
      t.integer :business_report_id, null: false
      t.integer :business_id, null: false
      t.datetime :date
      t.string  :category
      t.string  :employee_name
      t.string  :employee_address
      t.string  :expense_description
      t.integer :amount_before_tax
      t.string  :tax_name
      t.integer :tax_amount
      t.timestamps
    end

    add_index :business_report_entries, :business_report_id
    add_foreign_key :business_report_entries, :business_reports

    add_index :business_report_entries, :business_id
    add_foreign_key :business_report_entries, :businesses

    add_index :business_report_entries, [:business_id, :business_report_id], name: 'business_reports_id_and_business_id'

    add_index :business_report_entries, :category
    add_index :business_report_entries, :tax_name
  end
end
