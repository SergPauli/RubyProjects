const { ACTION_LOGIN, ACTION_LOGOUT } = require("./types")

export function actionLogin(data){
    return {
        type: ACTION_LOGIN,
        payload: data
    }
} 

export function actionLogout(data) {
  return {
    type: ACTION_LOGOUT,
    payload: data,
  }
} 