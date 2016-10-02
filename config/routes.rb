Rails.application.routes.draw do
  root 'static_pages#home'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'
  get  '/download', to: 'expenses#download'
  get  '/expenses/upload',  to: 'expenses#upload'
  post '/expenses/upload',  to: 'expenses#file'
  resources :employees
  resources :categories
  resources :tax_names
  resources :expenses
end