class RegisterController < ApplicationController
  # method to render registration home page
  def index
    render 'register'
  end

  # method to register new user, returns json to ajax requests made from client side
  def register
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user
      flash[:notice] = "Account created successfully! Please login."
      respond_to do |format|
        format.html {redirect_to '/'}
        format.json {render json: flash[:notice]}
      end
    else
      @errors = @user.errors.full_messages
      respond_to do |format|
        p @errors
        format.html {render '_reg.html.erb'}
        format.json {render json: @errors, status: :unprocessable_entity}
      end
    end
  end

  # method to render partial (typically used to display server side validation, if any)
  def partialR
    render '_reg'
  end

  # private method encapsulating user param method definitions
  private
    def user_params
      params.require(:user).permit(:firstname, :lastname, :email, :password, :password_confirmation)
    end
end
