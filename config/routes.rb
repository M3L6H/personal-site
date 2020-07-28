Rails.application.routes.draw do
  namespace :api do
    resources :users, except: [:new, :edit, :index]
    resource :session, only: [:create, :destroy]
  end

  root to: "static_pages#root"
end
