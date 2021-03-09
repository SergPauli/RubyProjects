class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    def not_found
        render json: { error: 'not_found' }, status: :not_found
    end
    
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header        
        begin          
          unless SessionList.instance.exist(header)
            render json: { error: "unauthorized" }, status: :unauthorized          
          end
          @decoded = JsonWebToken.decode(header)
          puts @decoded.to_json()        
        rescue JWT::DecodeError => e          
          SessionList.instance.remove(header)
          #render json: { message: e.message }, status: :request_timeout       
        end
    end
end
