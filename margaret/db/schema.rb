# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160617215108) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "business_report_entries", force: :cascade do |t|
    t.integer  "business_report_id",  null: false
    t.integer  "business_id",         null: false
    t.datetime "date"
    t.string   "category"
    t.string   "employee_name"
    t.string   "employee_address"
    t.string   "expense_description"
    t.integer  "amount_before_tax"
    t.string   "tax_name"
    t.integer  "tax_amount"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "business_report_entries", ["business_id", "business_report_id"], name: "business_reports_id_and_business_id", using: :btree
  add_index "business_report_entries", ["business_id"], name: "index_business_report_entries_on_business_id", using: :btree
  add_index "business_report_entries", ["business_report_id"], name: "index_business_report_entries_on_business_report_id", using: :btree
  add_index "business_report_entries", ["category"], name: "index_business_report_entries_on_category", using: :btree
  add_index "business_report_entries", ["tax_name"], name: "index_business_report_entries_on_tax_name", using: :btree

  create_table "business_reports", force: :cascade do |t|
    t.integer  "business_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "business_reports", ["business_id"], name: "index_business_reports_on_business_id", using: :btree

  create_table "businesses", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "address",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "businesses", ["name"], name: "index_businesses_on_name", using: :btree

  add_foreign_key "business_report_entries", "business_reports"
  add_foreign_key "business_report_entries", "businesses"
  add_foreign_key "business_reports", "businesses"
end
