import { combineReducers } from "redux"
import {authReducer} from "./authReducer"
import { layoutReducer } from "./layoutReducer"
import { messageReducer } from "./messageReducer"

export const rootReducer = combineReducers({
  layout: layoutReducer, auth: authReducer, message: messageReducer}  
)
