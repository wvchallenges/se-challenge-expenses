Rails.application.routes.draw do
  
  get '/expenses/get_expenses' => 'expenses#get_expenses'
  
  resources :employees
  resources :expenses

  root 'expenses#index'

  resources :expenses do
    collection do
      post :upload
    end
  end

end
