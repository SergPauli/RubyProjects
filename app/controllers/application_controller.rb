class ApplicationController < ActionController::Base
    def not_found
        render json: { error: 'not_found' }
    end
    
    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin             
          @decoded = JsonWebToken.decode(header)
          @session = Session.find_by(token: header)
          @current_user = @session.user
        rescue ActiveRecord::RecordNotFound => e
          render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
          render json: { errors: e.message }, status: :unauthorized
        end
    end
end
