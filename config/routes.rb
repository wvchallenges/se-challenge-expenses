Rails.application.routes.draw do

  resources :expense_documents do
    collection { post :import }
  end

  resources :employee_expenses, only: :index

  root 'employee_expenses#index'
end
