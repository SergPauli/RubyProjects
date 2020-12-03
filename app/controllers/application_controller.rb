class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    def not_found
        render json: { error: 'not_found' }
    end
    
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin             
          @decoded = JsonWebToken.decode(header)
          puts '@decoded', @decoded
          @session ||= Session.find_by(token: header)
          if @session == nil
            render json: { errors: "unauthorized" }, status: :unauthorized
          else  
            @current_user = @session.user
          end  
        rescue ActiveRecord::RecordNotFound => e
          render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
          render json: { errors: e.message }, status: :unauthorized
        end
    end
end
