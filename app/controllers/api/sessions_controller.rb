class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create]
  before_action :require_json
  
  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])

    if @user
      login(@user)
      render :create
    else
      if User.find_by(username: user_params[:username])
        render json: { password: "Incorrect password" }, status: 422
      else
        render json: { username: "A user does not exist with the provided username" }, status: 422
      end
    end
  end

  def destroy
    if logged_in?
      logout
      render json: {}, status: 200
    else
      render json: { error: "Not logged in" }, status: 403
    end
  end
end
