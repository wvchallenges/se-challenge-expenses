Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
  
  root "employee_expenses#index"

  resources :documents, only: :create
  resources :employee_expenses, only: :index

  mount ActionCable.server => '/cable'
end
