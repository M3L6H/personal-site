Rails.application.routes.draw do
  namespace :api do
    # For now, we are not intersted in creating new users
    resources :users, except: [:create, :new, :edit, :index]
    resource :session, only: [:create, :destroy]
  end

  root to: "static_pages#root"
end
