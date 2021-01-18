import { ACTION_SET_MEDIA_SCRINE, ACTION_SIDEBARTOGGLE, ACTION_SET_STATUS } from "./types"
import Cookies from "universal-cookie"

const cookies = new Cookies()
const getStateFromCookies = () => {
  const isLayoutStaticInactive = cookies.get("isLayoutStaticInactive")
  const layout =
    isLayoutStaticInactive === undefined
      ? { isLayoutStaticInactive: false, isTabletOrMobile: undefined, isLoading: false }
      : { isLayoutStaticInactive, isTabletOrMobile: undefined, isLoading: false }
    return layout
}

export const layoutReducer = (state = getStateFromCookies(), action) => {  
    // console.log("layoutReducer", action.payload)  
  switch (action.type) {
    case ACTION_SIDEBARTOGGLE:
      cookies.set("layout", { isLayoutStaticInactive: action.payload })
      return { ...state, isLayoutStaticInactive: action.payload }
    case ACTION_SET_MEDIA_SCRINE:
      return { ...state, isTabletOrMobile: action.payload }
    case ACTION_SET_STATUS:
      return { ...state, isLoading: !state.isLoading }
    default:
      return state
  }
}
