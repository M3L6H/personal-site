class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  
  # Auth methods
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  # Filters
  def require_logged_in
    redirect_to "/", status: 403 unless logged_in?
  end

  def require_logged_out
    redirect_to "/", status: 403 if logged_in?
  end

  def require_admin
    redirect_to "/", status: 403 unless logged_in? && current_user.is_admin?
  end

  def require_json
    redirect_back fallback_location: "/" if request.format.html?
  end
  
  # Utilities
  def convert_errors(errors)
    errors.messages.map do |k, v|
      [k, v.map { |msg| "#{ ActiveSupport::Inflector::humanize(k) } #{ msg }" }]
    end.to_h
  end
  
  # Params
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
