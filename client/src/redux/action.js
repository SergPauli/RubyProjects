const {
  ACTION_LOGIN,
  ACTION_LOGOUT,
  ACTION_SIDEBARTOGGLE,
  ACTION_SET_MEDIA_SCRINE,
  ACTION_PUT_MESSAGE,
  ACTION_CLEAR_STATUS,
  ACTION_SET_STATUS,
} = require("./types")

export function actionLogin(data){
    return { type: ACTION_LOGIN, payload: data }
} 
export function actionLogout(data) {  
  return { type: ACTION_LOGOUT, payload: data}
} 
export function actionSideBarToggle(data){  
  return { type: ACTION_SIDEBARTOGGLE, payload: data }
}
export function actionSetMediaScrine(data) { 
  return { type: ACTION_SET_MEDIA_SCRINE, payload: data }
} 
export function actionPutMessage(data) {  
  return { type: ACTION_PUT_MESSAGE, payload: data }
}
export function actionClearStatus(data) {
  return { type: ACTION_CLEAR_STATUS, payload: data }
} 
export function actionSetLoading() {
  return { type: ACTION_SET_STATUS, payload: null }
}