Rails.application.routes.draw do
  
  resources :employees
  resources :expenses

  root 'expenses#index'

  resources :expenses do
    collection do
      post :upload
    end
  end
  
end
