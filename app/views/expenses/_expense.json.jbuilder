json.extract! expense, :id, :date, :category_id, :employee_id, :employee_address, :expense_description, :pre_tax_amount, :tax_id, :tax_amount, :created_at, :updated_at
json.url expense_url(expense, format: :json)