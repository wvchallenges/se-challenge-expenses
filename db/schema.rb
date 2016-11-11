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

ActiveRecord::Schema.define(version: 20161111172420) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
  end

  create_table "employees", force: :cascade do |t|
    t.string "name"
    t.string "address"
  end

  create_table "expenses", force: :cascade do |t|
    t.date    "date"
    t.integer "category_id"
    t.integer "employee_id"
    t.text    "description"
    t.integer "pre_tax_amount_cents",    default: 0,     null: false
    t.string  "pre_tax_amount_currency", default: "USD", null: false
    t.integer "tax_id"
    t.integer "tax_amount_cents",        default: 0,     null: false
    t.string  "tax_amount_currency",     default: "USD", null: false
    t.integer "upload_id"
    t.index ["category_id"], name: "index_expenses_on_category_id", using: :btree
    t.index ["employee_id"], name: "index_expenses_on_employee_id", using: :btree
    t.index ["tax_id"], name: "index_expenses_on_tax_id", using: :btree
  end

  create_table "taxes", force: :cascade do |t|
    t.string "name"
  end

  create_table "uploads", force: :cascade do |t|
    t.string   "file_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
