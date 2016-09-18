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

ActiveRecord::Schema.define(version: 20160918190202) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expenses", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "employee_id"
    t.date     "date"
    t.string   "description"
    t.decimal  "pretax_amount"
    t.string   "tax_name"
    t.decimal  "tax_amount"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["category_id"], name: "index_expenses_on_category_id", using: :btree
    t.index ["employee_id"], name: "index_expenses_on_employee_id", using: :btree
  end

  create_table "imported_expenses", id: false, force: :cascade do |t|
    t.integer "import_id",  null: false
    t.integer "expense_id", null: false
    t.index ["expense_id"], name: "index_imported_expenses_on_expense_id", using: :btree
    t.index ["import_id"], name: "index_imported_expenses_on_import_id", using: :btree
  end

  create_table "imports", force: :cascade do |t|
    t.string   "original_filename"
    t.string   "uploaded_file"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_foreign_key "expenses", "categories"
  add_foreign_key "expenses", "employees"
end
