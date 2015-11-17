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

ActiveRecord::Schema.define(version: 20151117200821) do

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "categories", ["name"], name: "index_categories_on_name", unique: true

  create_table "employees", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "address",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "employees", ["name"], name: "index_employees_on_name", unique: true

  create_table "expenses", force: :cascade do |t|
    t.integer  "employee_id",    null: false
    t.integer  "category_id",    null: false
    t.integer  "tax_id",         null: false
    t.date     "date",           null: false
    t.string   "description"
    t.float    "pre_tax_amount"
    t.float    "tax_amount"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "expenses", ["category_id"], name: "index_expenses_on_category_id"
  add_index "expenses", ["employee_id", "category_id", "tax_id"], name: "index_expenses_on_employee_id_and_category_id_and_tax_id"
  add_index "expenses", ["employee_id"], name: "index_expenses_on_employee_id"
  add_index "expenses", ["tax_id"], name: "index_expenses_on_tax_id"

  create_table "taxes", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taxes", ["name"], name: "index_taxes_on_name", unique: true

end
