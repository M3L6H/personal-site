Rails.application.routes.draw do
  namespace :api do
    resources :users, except: [:new, :edit, :index]
  end

  root to: "static_pages#root"
end
