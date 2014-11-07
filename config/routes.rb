SeChallenge::Application.routes.draw do
  resources :data_imports
  get "welcome/index"
  root :to => 'data_imports#index'
  match '/import', to: 'data_imports#import'
end
