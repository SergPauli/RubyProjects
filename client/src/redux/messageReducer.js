import { ACTION_PUT_MESSAGE, ACTION_CLEAR_STATUS } from "./types"

export const messageReducer = (state = null, action) => {
  // console.log("layoutReducer", action.payload)
  switch (action.type) {
    case ACTION_PUT_MESSAGE:
      return action.payload 
    case ACTION_CLEAR_STATUS:
      return null
    default:
      return state
  }
}
