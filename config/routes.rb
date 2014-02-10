SeChallenge::Application.routes.draw do

  resources :expenses, :only => [:index]
  resources :categories, :only => [:index]
  resources :employees, :only => [:index]
  resources :expense_sheets, :only => [:index, :show, :new] do
    collection do
      post :upload
    end
    member do
      get :splash
    end
  end

  root :to => 'expense_sheets#splash'

end
