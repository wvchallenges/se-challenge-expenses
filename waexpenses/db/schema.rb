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

ActiveRecord::Schema.define(version: 20150420195203) do

  create_table "categories", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "categories", ["category_id"], name: "index_categories_on_category_id"

  create_table "employees", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "expenses", force: true do |t|
    t.date     "date"
    t.string   "description"
    t.integer  "amount_cents", default: 0, null: false
    t.integer  "category_id"
    t.integer  "employee_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "expenses", ["category_id"], name: "index_expenses_on_category_id"
  add_index "expenses", ["employee_id"], name: "index_expenses_on_employee_id"

  create_table "expenses_taxes", id: false, force: true do |t|
    t.integer "expense_id"
    t.integer "tax_id"
  end

  add_index "expenses_taxes", ["expense_id"], name: "index_expenses_taxes_on_expense_id"
  add_index "expenses_taxes", ["tax_id"], name: "index_expenses_taxes_on_tax_id"

  create_table "tax_amounts", force: true do |t|
    t.integer  "amount_cents", default: 0, null: false
    t.date     "date"
    t.integer  "tax_id"
    t.integer  "expense_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tax_amounts", ["expense_id"], name: "index_tax_amounts_on_expense_id"
  add_index "tax_amounts", ["tax_id"], name: "index_tax_amounts_on_tax_id"

  create_table "taxes", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
