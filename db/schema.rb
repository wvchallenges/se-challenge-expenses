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

ActiveRecord::Schema.define(version: 20170110051735) do

  create_table "categories", force: :cascade do |t|
    t.string "name"
  end

  create_table "employees", force: :cascade do |t|
    t.string "name",    null: false
    t.string "address"
  end

  create_table "expenses", force: :cascade do |t|
    t.datetime "date"
    t.string   "description"
    t.decimal  "pretax_amount"
    t.decimal  "tax_amount"
    t.decimal  "total_amount"
    t.integer  "employee_id"
    t.integer  "category_id"
    t.integer  "tax_id"
    t.index ["category_id"], name: "index_expenses_on_category_id"
    t.index ["employee_id"], name: "index_expenses_on_employee_id"
    t.index ["tax_id"], name: "index_expenses_on_tax_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "taxes", force: :cascade do |t|
    t.string "name",       null: false
    t.float  "percentage", null: false
  end

end
