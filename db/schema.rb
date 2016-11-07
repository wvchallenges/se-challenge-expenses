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

ActiveRecord::Schema.define(version: 20150825013554) do

  create_table "expenses", force: :cascade do |t|
    t.date    "date",                                                                 null: false
    t.integer "category",            limit: 4,                            default: 0, null: false
    t.string  "employee_name",       limit: 255,                                      null: false
    t.string  "employee_address",    limit: 255,                                      null: false
    t.string  "expense_description", limit: 255,                                      null: false
    t.decimal "pre_tax_amount",                  precision: 12, scale: 2,             null: false
    t.integer "tax_name",            limit: 4,                            default: 0, null: false
    t.decimal "tax_amount",                      precision: 12, scale: 2,             null: false
  end

  add_index "expenses", ["date"], name: "index_expenses_on_date", using: :btree

end
