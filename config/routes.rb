SeChallenge::Application.routes.draw do

  resources :expenses, only: [:index]
  resources :expense_sheets, only: [:index, :show, :new] do
    collection do
      post :upload
    end
  end

  root to: 'expense_sheets#index'

end
