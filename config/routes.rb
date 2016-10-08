Rails.application.routes.draw do

  root 'expenses#index'

  resources :expenses, only: [:index, :import] do
    collection do
      post :import
    end
  end

end
