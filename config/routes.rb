Rails.application.routes.draw do
  get 'import/form'

  post 'import/results'

  root to: 'import#form', via: 'get'
  root to: 'import#results', via: 'post'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
