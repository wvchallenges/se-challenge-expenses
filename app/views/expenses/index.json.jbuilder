json.array!(@expenses) do |expense|
  json.extract! expense, :id
  json.url expense_url(expense, format: :json)
end
