import { ACTION_LOGIN, ACTION_LOGOUT } from "./types"
import Cookies from "universal-cookie"

const cookies = new Cookies();
const getStateFromCookies = () =>{
    const auth = cookies.get("auth")
    return auth === undefined ? null : auth
} 

export const authReducer = (state = getStateFromCookies(), action) => {
  //console.log('authReducer')
  switch (action.type) {
    case ACTION_LOGIN: 
      cookies.set("auth", action.payload)      
      return action.payload
    case ACTION_LOGOUT:
        cookies.remove("auth"); 
      return null;
    default:
      return state;
  }
}