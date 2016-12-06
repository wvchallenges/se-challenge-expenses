Rails.application.routes.draw do
  resources :expenses do
    post :upload, on: :collection
  end

  root "expenses#index"
end
