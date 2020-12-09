import { ACTION_LOGIN } from "./types"
import Cookies from "universal-cookie"

const cookies = new Cookies();
const getStateFromCookies = () =>{
    const auth = cookies.get("auth")
    return auth === undefined ? null : auth
} 

export const authReducer = (state = getStateFromCookies(), action) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return action.payload;
    default:
      return state;
  }
}