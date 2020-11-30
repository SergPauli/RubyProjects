class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login

  # POST /auth/login
  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      @session = Session.create(token, @user)
      if @session 
        render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
               username: @user.username }, status: :ok
      else     
        render json: { error: 'session not created' }, status: :unauthorized
      end               
    else      
      render json: { error: 'unauthorized' }, status: :unauthorized            
    end
  end
   # GET /auth/logout/:token
   def logout
    session = Session.destroy_by(token: params[:token])
    if session
        render json: {message: 'session destroyed'}, status: :ok
    else    
        render json: {error: 'session not destroyed',
            data:session.errors}, status: 500
    end       
   end 

  private

  def login_params
    params.permit(:email, :password)
  end
end
