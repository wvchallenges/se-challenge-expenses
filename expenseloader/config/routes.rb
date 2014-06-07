Rails.application.routes.draw do
  resources :expense_sheets, only: [:show, :new, :create]

  root 'expense_sheets#new'
end
