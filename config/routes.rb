Rails.application.routes.draw do

  root to: 'imports#new'
  resources :imports, only: [:new, :create]

end
