class LoginController < ApplicationController
  # create session for returning user
  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to "/memos"
    else
      @errors = "Information provided does not match our records, please register or enter correct information."
      respond_to do |format|
        format.html {render '_login.html.erb'}
        format.json {render json: @errors, status: :unprocessable_entity}
      end
    end
  end

  # displays login partial (where server side login validation errors rendered, if any)
  def partialL
    render '_login'
  end

  # destroy exisitng user session, invoked by '/logout' route
  def destroy
    session[:user_id] = nil if session[:user_id]
    redirect_to '/'
  end
end
