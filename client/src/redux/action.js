const { ACTION_LOGIN, ACTION_LOGOUT, ACTION_SIDEBARTOGGLE, ACTION_SET_MEDIA_SCRINE } = require("./types")

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

export function actionSideBarToggle(data){  
  return {
    type: ACTION_SIDEBARTOGGLE,
    payload: data,
  }
}
export function actionSetMediaScrine(data) { 
  return {
    type: ACTION_SET_MEDIA_SCRINE,
    payload: data,
  }
} 