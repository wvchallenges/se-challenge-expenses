json.array!(@amounts) do |amount|
  json.extract! amount, :id, :d, :category, :employee_name, :expense_description, :pre_tax_amount, :tax_name, :tax_amount, :total_tax
  json.url amount_url(amount, format: :json)
end
