require 'sidekiq/web'

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  post 'upload', to: 'home#upload'
  get 'check_status/:check_id', to: 'home#check_status'
  get 'report', to: 'home#report'

  namespace :api do
    put :tax_report, to: 'forms#process_tax_report'
  end

  mount Sidekiq::Web => '/sidekiq'
end
