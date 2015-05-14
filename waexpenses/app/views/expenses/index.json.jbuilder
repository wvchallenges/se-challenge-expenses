json.array!(@expenses) do |expense|
  json.extract! expense, :id, :date, :description
  json.url expense_url(expense, format: :json)
end
