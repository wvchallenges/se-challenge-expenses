Rails.application.routes.draw do
  root 'home#index'

  namespace :business do
    resources :businesses do
      member do
        post 'upload'
      end
    end
  end
end
