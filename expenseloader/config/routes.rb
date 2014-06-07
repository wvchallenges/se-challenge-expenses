Rails.application.routes.draw do
  resources :expense_sheets, only: [:new, :create]
  resources :expenses, only: [:index]

  root 'expense_sheets#new'
end
