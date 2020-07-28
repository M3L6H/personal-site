class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:update, :show, :destroy]
  before_action :require_json
  
  def show
    if current_user.id != params[:id] && !current_user.is_admin?
      render json: ["Cannot view another user's profile!"], status: 403
      return
    end
    
    @user = User.find_by(id: params[:id])

    if @user
      render :show
    else
      render json: ["Could not find user with id #{ params[:id] }"], status: 404
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :create            
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    if current_user.id != params[:id] && !current_user.is_admin? 
      render json: ["Cannot delete another user!"], status: 403
      return
    end

    @user = User.find_by(id: params[:id])

    if @user
      @user.destroy
      render :destroy
    else
      render json: ["Could not find user with id #{ params[:id] }"], status: 404
    end
  end

  def update
    if !logged_in? || current_user.id != params[:id] 
      render json: ["Cannot update another user!"], status: 403
      return
    end
    
    @user = User.find_by(id: params[:id])

    if @user
      if @user.update(user_params)
        render :update
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ["Could not find user with id #{ params[:id] }"], status: 404
    end
  end
end
