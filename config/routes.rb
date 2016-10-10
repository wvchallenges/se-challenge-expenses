Rails.application.routes.draw do

  root 'expenses#index'

  resources :expenses, only: [:index, :import] do
    collection do
      get :upload
      post :import
    end
  end

  resources :employees, only: [:index]
  resources :taxes, only: [:index]
  resources :expense_categories, only: [:index]

end
