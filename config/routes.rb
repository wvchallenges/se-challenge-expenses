SeChallenge::Application.routes.draw do
  resources :employee_expenses
  get "welcome/index"
  root :to => 'employee_expenses#index'
  match '/import', to: 'employee_expenses#import'
end
