Rails.application.routes.draw do
  root 'home#index'

  namespace :business do
    resources :businesses
  end
end
