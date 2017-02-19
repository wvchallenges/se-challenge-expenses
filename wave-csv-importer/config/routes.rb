Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'csv_form#get'
  get 'csv_form', to: 'csv_form#get'
  post 'csv_form', to: 'csv_form#upload'
end
