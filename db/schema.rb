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

ActiveRecord::Schema.define(version: 20150805030020) do

  create_table "financial_portfolios", force: :cascade do |t|
  end

  create_table "portfolio_fields", force: :cascade do |t|
    t.date     "date"
    t.string   "category"
    t.string   "employee_name"
    t.string   "employee_address"
    t.string   "expense_description"
    t.float    "pre_tax_amount"
    t.string   "tax_name"
    t.float    "tax_amount"
    t.integer  "financial_portfolio_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "portfolio_fields", ["financial_portfolio_id"], name: "index_portfolio_fields_on_financial_portfolio_id"

end
