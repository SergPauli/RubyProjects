require 'rest-client'
class V1::KladrController < ApplicationController
  def index
    begin
       r1 = RestClient.get url, HEADERS  
       r = JSON.parse(r1) 
       resultes_arr = Array.new
       if (r['result']) 
          r['result'].each do |item| 
            resultes_arr.push item
          end
       end  
       render json: resultes_arr   
    rescue JSON::ParserError => e  
       puts r1 
       render json: e        
    rescue RestClient::RequestFailed => e
       render json: e
    rescue RestClient::ExceptionWithResponse => e
       render json: e.response
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