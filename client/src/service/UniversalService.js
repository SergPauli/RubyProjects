import BaseService from "./BaseService"
const baseUrl = "v1/universal_api/"

export class UniversalService extends BaseService {
  index(model, params, fromLocalStore = false) {
    if (fromLocalStore) {
      const find = localStorage.getItem(model)
      if (find) return find
    }      
    return this.instance.post(baseUrl + model, params, this.requestConfig).then((response) => {
      //console.log('response ', response)
      if (response.data.status === 200){
        localStorage.setItem(model, response.data.data)
        return response.data.data
      } 
      if (response.data.message) throw new Error(response.data.message)
    })
  }
  edit(model, id, data) {
    return this.instance.put(baseUrl + model + id, data, this.requestConfig).then((response) => {
      if (response.data.status === 200) return response.data.data
      if (response.data.message) throw new Error(response.data.message)
    })
  }
  create(model, data) {
    return this.instance.post(baseUrl + model + "add/", data, this.requestConfig).then((response) => {
      if (response.data.status === 200) return response.data.data
      if (response.data.message) throw new Error(response.data.message)
    })
  }
}