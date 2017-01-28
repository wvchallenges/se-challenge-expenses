json.extract! expenses_file, :id, :name, :description, :created_at, :updated_at
json.url expenses_file_url(expenses_file, format: :json)