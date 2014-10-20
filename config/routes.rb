Rails.application.routes.draw do
  resources :csvs
  root :to => 'csvs#new'
end
