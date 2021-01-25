require 'rest-client'
if Diagnosis.count.zero? 
    puts "Diagnoses seeding from old base..."
    # настройки менять здесь
    offset = 0 # смещение выборки
    limit = 500 # колличество записей, обрабатываемых за цикл 
    url = "http://localhost:3000/universal_api/Mkb10" #адрес метода микросервиса на стороне старой версии
    headers = {content_type: :json, accept: :json} # заголовки в запросе
    mappings = {'ID' => 'id'}  # сопоставление полей, сменивших название в новой версии 

    # цикл получения записей из старой базы
    r = RestClient.post url, {offset: offset, limit: limit}.to_json, headers
    records = JSON.parse(r)    
    while records != []            
        records.each do |record|
            synonyms = record['synonyms']
            @synonyms = []
            record.delete('synonyms')                       
            record.keys.each { |k| record[mappings[k]] = record.delete(k) if mappings[k] }
            @diagnosis = Diagnosis.create(record)
            if @diagnosis && synonyms != [] 
                synonyms.each do | syn |
                    @synonyms.push(Synonym.new( name: syn['name']))
                end
                begin
                  @diagnosis.synonyms = @synonyms
                  @diagnosis.save
                rescue ActiveRecord::RecordNotSaved
                  puts @diagnosis.to_json, @synonyms.to_json
                end  
            end
        end
        offset += limit
        r = RestClient.post url, {offset: offset, limit: limit}.to_json, headers 
        records = JSON.parse(r)
        puts offset       
    end     
end 