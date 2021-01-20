import axios from "axios"
import store from "../redux/store"
import { actionLogout, actionPutMessage, actionSetLoading } from "../redux/action"
export default class BaseService {
  requestConfig = {
    baseURL: "http://localhost:3000/",
    headers: {
      common: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  }
  instance = axios.create(this.requestConfig)
  constructor() {
    const state = store.getState()  
    const token = state.auth? state.auth.token : null
    if (token) this.requestConfig.headers.common["Authorization"] = token
    this.instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return new Promise(function (resolve, reject) {
          if (error.message.includes("401") && error.config && !error.config.__isRetryRequest) {
             store.dispatch(
               actionPutMessage({
                 severity: "error",
                 summary: "Доступ запрещен: 401",
                 detail: "Необходимо выполнить вход в систему",
               })
             )
             store.dispatch(actionLogout(token))
             store.dispatch(actionSetLoading())
          } throw error
        })
      }
    )
  }
}
