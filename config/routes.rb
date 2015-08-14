Rails.application.routes.draw do
  root 'expenses#show'
  post '/new_data' => 'expenses#upload'
end
