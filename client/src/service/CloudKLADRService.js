import BaseService from "./BaseService"
export class CloudKLADRService extends BaseService {
 
  getItems(params, limit = "25") {
    let searchStr = "api.php?"
    Object.keys(params).forEach(function (key) {
      searchStr = searchStr + key + "=" + this[key]
      searchStr = searchStr + "&"
    }, params)
    searchStr = searchStr + "limit=" + limit
    return this.instance.post("/v1/kladr", {askstring: searchStr}, 
    this.requestConfig).then((response) => {  
      //console.log("response.data", response.data)    
      const items = response.data
        .filter((item) => item.id !== "Free")
        .map((item) => {
          const result = { id: item.id }
          if (item.zip) result.zip = item.zip
          if (item.contentType === "region" || item.contentType === "district") result.name = item.name + " " + item.typeShort
          else  result.name = item.typeShort + " " + item.name
          if (item.parents) {
            result["AOGUID"] = item.parentGuid
            result["HouseGUID"] = item.guid
            item.parents.forEach((parent) => {
              switch (parent.contentType) {
                case "region":
                  result.region = { id: parent.id, name: parent.name + " " + parent.typeShort }
                  break
                case "district":
                  result.district = { id: parent.id, name: parent.name + " " + parent.typeShort }
                  break
                case "city":
                  result.city = { id: parent.id, name: parent.typeShort + " " + parent.name }
                  break
                case "street":
                  result.street = { id: parent.id, name: parent.typeShort + " " + parent.name }
                  break
                default:
              }
            })
            result.name = ""
            if (result.region && !result.region.name.includes("г")) result.name = result.region.name + ", "
            if (result.district) result.name = result.name + result.district.name + ", "
            if (result.city) result.name = result.name + result.city.name + ", "
            if (result.street) result.name = result.name + result.street.name + ", "
            if (item.contentType === "building") result.name = result.name + "д " + item.name
            else result.name = result.name + item.typeShort + " " + item.name
          }
          return result
        })
      return items
    })
  }
}
