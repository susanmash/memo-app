class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # If no session created, redirect to home (registration/login page)
  def require_login
    redirect_to '/' if session[:user_id] == nil
  end

  # current_user => user that has a session created
  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

  # below helper methods to verify user's state and access
  helper_method :current_user, :require_login
end
