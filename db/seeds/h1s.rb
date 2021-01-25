require 'rest-client'
if H1.count.zero? 
    puts "H1s seeding..."
    offset = 0
    limit = 6
    r = RestClient.post "http://localhost:3000/universal_api/H1", {offset: offset, limit: limit}.to_json, {content_type: :json, accept: :json}
    records = JSON.parse(r)
    while records != []            
        records.each do |record|
            H1.create(record)
            puts record
        end
        offset += 6
        r = RestClient.post "http://localhost:3000/universal_api/H1", {offset: offset, limit: limit}.to_json, {content_type: :json, accept: :json} 
        records = JSON.parse(r)       
    end     
end 