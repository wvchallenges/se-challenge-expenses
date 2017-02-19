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

ActiveRecord::Schema.define(version: 20170219185754) do

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "address",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "employee_id"
    t.index ["employee_id"], name: "index_employees_on_employee_id"
  end

  create_table "expenses", force: :cascade do |t|
    t.datetime "occurance_date", null: false
    t.text     "description",    null: false
    t.float    "pre_tax_amount", null: false
    t.float    "tax_amount",     null: false
    t.string   "tax_type",       null: false
    t.integer  "employee_id",    null: false
    t.integer  "category_id",    null: false
    t.index ["category_id"], name: "index_expenses_on_category_id"
    t.index ["employee_id"], name: "index_expenses_on_employee_id"
  end

end
