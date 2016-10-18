Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'expenses#index'

  get 'list', :to=>'expenses#list'
  post 'delete_all_expenses', :to=>'expenses#delete_all_expenses'

  resources :expenses do
    collection {post :import_file}
  end

end
