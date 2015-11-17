Rails.application.routes.draw do
  resources :importers, only: [:index, :create]
  get 'importers/results'

  root 'importers#index'
end
