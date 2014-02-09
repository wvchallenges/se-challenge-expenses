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

ActiveRecord::Schema.define(version: 20140209203416) do

  create_table "employees", force: true do |t|
    t.string   "name"
    t.text     "address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "expense_sheets", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "expenses", force: true do |t|
    t.datetime "date"
    t.string   "category"
    t.text     "expense_description"
    t.integer  "pre_tax_amount_cents"
    t.string   "tax_name"
    t.integer  "tax_amount_cents"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "expense_sheet_id"
    t.integer  "employee_id"
  end

  add_index "expenses", ["employee_id"], name: "index_expenses_on_employee_id"
  add_index "expenses", ["expense_sheet_id"], name: "index_expenses_on_expense_sheet_id"

end
