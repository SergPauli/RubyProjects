class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    def not_found
        render json: {status: 404, message: "not_found+" }
    end
    
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header        
        begin          
          unless SessionList.instance.exist(header)
            render json: {status: 401, message: "Сессия не авторизована." }          
          end
          @decoded = JsonWebToken.decode(header)
          #puts @decoded.to_json()        
        rescue JWT::DecodeError => e          
          SessionList.instance.remove(header)
          render json: {status: 401, message: "Превышен лимит времени сессии." }        
        end
    end
end
