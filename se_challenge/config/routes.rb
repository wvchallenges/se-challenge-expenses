Rails.application.routes.draw do
  get 'expenses/index'
 
  root 'expenses#index'

  resources :expenses

  post '/expenses/import_csv', to: 'expenses#import_csv'
  get '/expenses/list/:id', to: 'expenses#list'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
