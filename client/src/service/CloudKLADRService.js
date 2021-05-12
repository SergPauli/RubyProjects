import BaseService from "./BaseService"
import store from "../redux/store"
import { actionPutMessage,  } from "../redux/action"

export class CloudKLADRService extends BaseService {
 
  getItems(params, limit = "25") {
    let searchStr = "api.php?"
    Object.keys(params).forEach(function (key) {
      searchStr = searchStr + key + "=" + (this[key] === 'town' ? 'city': this[key])
      searchStr = searchStr + "&"
    }, params)
    searchStr = searchStr + "limit=" + limit
    return this.instance.post("/v1/kladr", {askstring: searchStr}, 
    this.requestConfig).then((response) => {      
    if (response.data.error) {
      store.dispatch(actionPutMessage({ severity: "error", summary: "Ошибка запроса к КЛАДР", detail: response.data.error }))
      return []
    }    
    const items = response.data
      .filter(
        (item) =>
          item.id !== "Free" &&
          !(
            (params.contentType === "city" && item.type !== "Город") ||
            (params.contentType === "town" && item.type === "Город")
          )
      )
      .map((item) => {
        const genLevel = (element) => {
          switch (element.contentType) {
            case "region":
              result.region = { id: element.id, name: element.name + " " + element.typeShort }
              break
            case "district":
              result.district = { id: element.id, name: element.name + " " + element.typeShort }
              break
            case "city":
              if (element.typeShort === "г" || element.typeShort === "г.")
                result.city = { id: element.id, name: element.typeShort + " " + element.name }
              else result.town = { id: element.id, name: element.typeShort + " " + element.name }
              break
            case "street":
              result.street = { id: element.id, name: element.typeShort + " " + element.name }
              break
            case "building":
              result.building = { id: element.id, name: element.typeShort + " " + element.name }
              break
            default:
          }
        }
        const result = { name: `${item.typeShort}  ${item.name}` }
        genLevel(item)
        if (item.zip) result.zip = item.zip
        if (item.parents) {
          result["AOGUID"] = item.parentGuid
          result["HouseGUID"] = item.guid
          item.parents.forEach((parent) => genLevel(parent))
          result.fullname = ""
          if (result.region && !result.region.name.includes("г ")) result.fullname = result.region.name + ", "
          if (result.district) result.fullname = result.fullname + result.district.name + ", "
          if (result.city) result.fullname = result.fullname + result.city.name + ", "
          if (result.street) result.fullname = result.fullname + result.street.name + ", "
          if (item.contentType === "building") {
            result.fullname = result.fullname + "д " + item.name
          } //else result.fullname = result.fullname + item.typeShort + " " + item.name
        }
        return result
      })        
      return items
    }).catch(error =>{
      store.dispatch(
        actionPutMessage({
          severity: "error",
          summary: "Ошибка запроса к КЛАДР",
          detail: error.toString(),
        })
      )})
  }
}
