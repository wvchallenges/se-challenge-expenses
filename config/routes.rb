Rails.application.routes.draw do

  resources :expenses do
    collection { post :import }
  end

  root to: "expenses#index"

end
