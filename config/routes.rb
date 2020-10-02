Rails.application.routes.draw do
  namespace :api do
    resources :contact, only: :create

    # For now, we are not interested in creating new users
    resources :users, except: [:new, :edit, :index]
    resources :posts, except: [:new, :edit]
    resources :skills, only: [:create, :update, :destroy]
    resources :taggings, only: [:create, :destroy]
    resource :session, only: [:create, :destroy]

    # Get the subject of the portfolio
    get "/subject", to: "users#subject"

    resources :projects, except: [:new, :edit]
  end

  root to: "static_pages#root"
  
  get "*path", to: "static_pages#root", constraints: -> (req) { !(req.fullpath =~ /^\/rails\/.*/ ) }
end
