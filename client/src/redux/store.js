import { compose, createStore } from "redux"
import { rootReducer } from "./rootReducer"
export default createStore(
  rootReducer,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

