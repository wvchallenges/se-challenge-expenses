json.array!(@expenses) do |expense|
  json.extract! expense, :id, :date, :employee_id, :address_id, :category_id, :description, :amount, :tax_name_id, :tax_amount
  json.url expense_url(expense, format: :json)
end
