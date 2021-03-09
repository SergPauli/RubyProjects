require 'rest-client'
class V1::KladrController < ApplicationController
  def index
    begin
       r1 = RestClient.get url, HEADERS  
       r = JSON.parse(r1) if !r1.include? "syntax error" 
       resultes_arr = Array.new
       if (r && r['result']) 
          r['result'].each do |item| 
            resultes_arr.push item
          end
       end  
       render json: resultes_arr  
    rescue RestClient::ResourceNotFound => e
        render json: {error: "Не найден ресурс #{BASEURL} в сети "}
    rescue SocketError => e
        render json: {error: "Невозможно подключение к #{BASEURL} "}
    rescue Errno::ECONNREFUSED => e
        render json: {error: "Сбой связи с #{BASEURL} "}   
    rescue JSON::ParserError => e
       p "JSON::ParserError ответ КЛАДР "+r1 
       render json: {error: "нераспознаный ответ КЛАДР"}              
    rescue RestClient::RequestFailed => e
       render json: {error: e} 
    rescue RestClient::ExceptionWithResponse => e
       render json: {error: e.response}
    end   
  end    
    
    
    
 private 
   def url      
    begin
      URI.parse(BASEURL+params[:askstring])
      BASEURL+params[:askstring]
    rescue URI::InvalidURIError
      URI.escape(BASEURL+params[:askstring])
    end   
   end

   BASEURL = "https://kladr-api.ru/" #адрес     
   HEADERS = {content_type: :json, accept: :json} # заголовки в запросе
end    