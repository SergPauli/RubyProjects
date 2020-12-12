import { combineReducers } from "redux"
import {authReducer} from "./authReducer"
import { layoutReducer } from "./layoutReducer"

export const rootReducer = combineReducers({
  layout: layoutReducer, auth: authReducer}  
)
