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

ActiveRecord::Schema.define(version: 20161204234925) do

  create_table "employees", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expense_categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expenses", force: :cascade do |t|
    t.integer  "expense_category_id"
    t.integer  "employee_id"
    t.integer  "tax_id"
    t.string   "description"
    t.decimal  "pre_tax_amount"
    t.decimal  "tax_amount"
    t.datetime "expensed_on"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.index ["employee_id"], name: "index_expenses_on_employee_id"
    t.index ["expense_category_id"], name: "index_expenses_on_expense_category_id"
    t.index ["tax_id"], name: "index_expenses_on_tax_id"
  end

  create_table "taxes", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
