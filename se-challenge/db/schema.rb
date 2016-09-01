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

ActiveRecord::Schema.define(version: 20160831020751) do

  create_table "expenses", force: :cascade do |t|
    t.string   "date",                null: false
    t.string   "category",            null: false
    t.string   "employee_name",       null: false
    t.string   "employee_address",    null: false
    t.string   "expense_description", null: false
    t.decimal  "pretax_amount",       null: false
    t.string   "tax_name",            null: false
    t.decimal  "tax_amount",          null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

end
