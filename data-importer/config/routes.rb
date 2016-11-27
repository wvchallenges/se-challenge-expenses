Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # namespace :admin do
	  
	# end

	post 'admin/dashboard', to: 'admin/dashboard#import_csv'
end
