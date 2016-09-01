Rails.application.routes.draw do
  resources :expenses
  root 'expenses#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
