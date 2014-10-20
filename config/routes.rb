Rails.application.routes.draw do
  resource :csvs
  root :to => "csvs#new"
end
