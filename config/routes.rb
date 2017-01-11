Rails.application.routes.draw do
  root 'expenses#new'

  resources :expenses, only: [:index, :new, :create]
end
