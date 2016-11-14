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

ActiveRecord::Schema.define(version: 20161112200606) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
  end

  create_table "documents", force: :cascade do |t|
    t.string  "file"
    t.string  "original_document_url"
    t.boolean "document_processing"
  end

  create_table "employee_expenses", force: :cascade do |t|
    t.datetime "date"
    t.integer  "category_id"
    t.integer  "employee_id"
    t.string   "description"
    t.decimal  "pre_tax_amount"
    t.integer  "tax_id"
    t.decimal  "tax_amount"
  end

  add_index "employee_expenses", ["category_id"], name: "index_employee_expenses_on_category_id", using: :btree
  add_index "employee_expenses", ["employee_id"], name: "index_employee_expenses_on_employee_id", using: :btree
  add_index "employee_expenses", ["tax_id"], name: "index_employee_expenses_on_tax_id", using: :btree

  create_table "employees", force: :cascade do |t|
    t.string "name"
    t.string "address"
  end

  create_table "taxes", force: :cascade do |t|
    t.string "name"
  end

end
