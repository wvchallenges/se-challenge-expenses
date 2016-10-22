Rails.application.routes.draw do
  root to: 'employees#index'
  resources :employees, only: [:index, :new, :show, :destroy] do
    collection do
      post :upload
      get :total_per_month
    end
  end
end
