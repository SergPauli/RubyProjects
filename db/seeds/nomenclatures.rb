require 'rest-client'
# настройки на сервис NSI менять здесь
offset = 0 # смещение выборки
limit = 500 # колличество записей, обрабатываемых за цикл
userKey ="14b522d0-5e5e-4d7c-a778-45b68e8abfe6"  #ключ пользователя на портале NSI
url = "https://nsi.rosminzdrav.ru:443/port/rest/data?userKey="+ userKey #адрес метода 
headers = {content_type: :json, accept: :json} # заголовки в запросе
mappings = {'ID' => 'id'}  # сопоставление полей, сменивших название 

puts "Создаем номенклатуру справочников согласно CDA R2 уровень 3 МедСС V4..."
res = Nomenclature.find_or_create_by!(name: "Position", oid: "1.2.643.5.1.13.13.11.1002", description:"Должности медицинских и фармацевтических работников")
puts "номенклатура 1.2.643.5.1.13.13.11.1002 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Diagnosis", oid: "1.2.643.5.1.13.13.11.1005", description:"Международная статистическая классификация болезней и проблем, связанных со здоровьем (10-й пересмотр) ")
puts "номенклатура 1.2.643.5.1.13.13.11.1005 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Sex", oid: "1.2.643.5.1.13.13.11.1040", description: "Пол паиента", version: "2.1")
puts "номенклатура 1.2.643.5.1.13.13.11.1040 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Area", oid: "1.2.643.5.1.13.13.11.1042", description: "Вид места жительства", version: "2.1")
puts "номенклатура 1.2.643.5.1.13.13.11.1042 обработана" if res
res = Nomenclature.find_or_create_by!(name: "MedicalService", oid: "1.2.643.5.1.13.13.11.1070", description: "Номенклатура медицинских услуг")
puts "номенклатура 1.2.643.5.1.13.13.11.1070 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Unit", oid: "1.2.643.5.1.13.13.11.1358", description: "Единицы измерения")
puts "номенклатура 1.2.643.5.1.13.13.11.1358 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Organization", oid: "1.2.643.5.1.13.13.11.1461", description: "Реестр медицинских организаций Российской Федерации")
puts "номенклатура 1.2.643.5.1.13.13.11.1461 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Organization", oid: "1.2.643.5.1.13.13.11.1522", description: "Виды медицинской документации")
puts "номенклатура 1.2.643.5.1.13.13.11.1522 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Relation", oid: "1.2.643.5.1.13.13.99.2.14", description: "Родственные и иные связи", version: "1.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.14 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Education", oid: "1.2.643.5.1.13.13.99.2.16", description: "Классификатор образования для медицинских свидетельств", version: "1.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.16 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Employment", oid: "1.2.643.5.1.13.13.99.2.17", description: "Занятость", version: "1.2")
puts "номенклатура 1.2.643.5.1.13.13.99.2.17 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Pregnancy", oid: "1.2.643.5.1.13.13.99.2.18", description: "Доношенность новорожденного", version: "1.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.18 обработана" if res
res = Nomenclature.find_or_create_by!(name: "CertificateKind", oid: "1.2.643.5.1.13.13.99.2.19", description: "Вид медицинского свидетельства о смерти", version: "1.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.19 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Situation", oid: "1.2.643.5.1.13.13.99.2.20", description: "Типы мест наступления смерти", version: "2.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.20 обработана" if res
res = Nomenclature.find_or_create_by!(name: "KindСause", oid: "1.2.643.5.1.13.13.99.2.21", description: "Род причины смерти", version: "2.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.21 обработана" if res
res = Nomenclature.find_or_create_by!(name: "KindStuff", oid: "1.2.643.5.1.13.13.99.2.22", description: "Тип медицинского работника, установившего причины смерти", version: "2.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.22 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Reason", oid: "1.2.643.5.1.13.13.99.2.23", description: "Основания для установления причин смерти", version: "1.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.23 обработана" if res
res = Nomenclature.find_or_create_by!(name: "RoadAccident", oid: "1.2.643.5.1.13.13.99.2.24", description: "Связь смерти с ДТП", version: "1.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.24 обработана" if res
res = Nomenclature.find_or_create_by!(name: "KindDocument", oid: "1.2.643.5.1.13.13.99.2.48", description: "Документы, удостоверяющие личность")
puts "номенклатура 1.2.643.5.1.13.13.99.2.48 обработана" if res
res = Nomenclature.find_or_create_by!(name: "CDAField", oid: "1.2.643.5.1.13.13.99.2.166", description: "Кодируемые поля CDA документов")
puts "номенклатура 1.2.643.5.1.13.13.99.2.166 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Region", oid: "1.2.643.5.1.13.13.99.2.206", description: "Субъекты Российской Федерации")
if res 
    r = RestClient.get url+"&identifier=1.2.643.5.1.13.13.99.2.206", headers
    data = JSON.parse(r)
    if (data['result'] = "OK")
        passed = 0
        data['list'].each do |record|
          record.each { |k| k['column'] = mappings[k['column']] if mappings[k['column']] }        
          params = {}
          record.each { |field|  params = params.merge(field['column'] => field['value']) if (field['column']!="SYNONYM")}
          res = Region.find_or_create_by! params
          passed+=1 if res    
        end    
        puts "номенклатура 1.2.643.5.1.13.13.99.2.206 обработана: #{passed} из #{data['total']}" if res 
    end 
end
res = Nomenclature.find_or_create_by!(name: "CDATemplate", oid: "1.2.643.5.1.13.13.99.2.267", description: "Шаблоны CDA документов")
puts "номенклатура 1.2.643.5.1.13.13.99.2.267 обработана" if res
res = Nomenclature.find_or_create_by!(name: "Privacy", oid: "1.2.643.5.1.13.13.99.2.285", description: "Уровень конфиденциальности медицинского документа", version: "1.1")
puts "номенклатура 1.2.643.5.1.13.13.99.2.285 обработана" if res
puts "обрабатываем 1.2.643.5.1.13.13.99.2.286... "
res = Nomenclature.find_or_create_by!(name: "NullFlavor", oid: "1.2.643.5.1.13.13.99.2.286", description: "Причины отсутствия информации (NullFlavor)", version: "1.1")
if res 
    r = RestClient.get url+"&identifier=1.2.643.5.1.13.13.99.2.286&version=1.1", headers
    data = JSON.parse(r)
    if (data['result'] = "OK")
        passed = 0
        data['list'].each do |record|
          record.each { |k| k['column'] = mappings[k['column']] if mappings[k['column']] }
          params = {}
          record.each { |field|  params = params.merge(field['column'] => field['value'])}
          res = NullFlavor.find_or_create_by! params
          passed+=1 if res    
        end    
        puts "номенклатура 1.2.643.5.1.13.13.99.2.286 обработана: #{passed} из #{data['total']}" if res 
    end 
end        