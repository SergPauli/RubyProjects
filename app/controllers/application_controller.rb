class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    def not_found
        render json: { error: 'not_found' }
    end
    
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        puts 'header '+header
        begin
          @decoded = JsonWebToken.decode(header)
          puts 'decoded '+@decoded.to_json()
          unless SessionList.instance.exist(header)
            render json: { errors: "unauthorized" }, status: :unauthorized          
          end        
        rescue JWT::DecodeError => e
          if SessionList.instance.exist(header)
            SessionList.instance.remove(header)
          end    
          render json: { errors: e.message }, status: :unauthorized
        end
    end
end
