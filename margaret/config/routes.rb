Rails.application.routes.draw do
  root 'home#index'

  namespace :business do
    resources :businesses do
      member do
        post 'upload'
      end

      resources :reports, only: [:show] do
        member do
          get :render_report
        end
      end
    end
  end

  namespace :api do
    resources :businesses, only: [] do
      collection do
        get :search
      end
      member do
        get :search_reports
      end
    end
  end
end
