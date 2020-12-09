class AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login

  # POST /auth/login
  def login 
    @user = User.find_by_username(params[:username])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      SessionList.instance.add(token) 
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
               username: @user.username }, status: :ok                   
    else      
      render json: { error: 'unauthorized' }, status: :unauthorized            
    end
  end
   # GET /auth/logout
   def logout    
    header = request.headers['Authorization']
    header = header.split(' ').last if header  
    if SessionList.instance.exst(header)
       SessionList.instance.remove(header)
        render json: {message: 'session destroyed'}, status: :ok
    else    
        render json: {error: 'session not found',
            data:session.errors}, status: 500
    end       
   end 

  private

  def login_params
    params.permit(:username, :password)
  end
end
