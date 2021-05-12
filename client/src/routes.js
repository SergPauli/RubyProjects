import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import WrappedLoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage"
import {connect} from "react-redux" 
import WrappedMainPage from "./pages/MainPage";
import { useMediaQuery } from "react-responsive"
import { bindActionCreators } from "redux";
import { actionSetMediaScrine } from "./redux/action";
import AddressPart from "./pages/certificateForm/AddressPart";

const Routes = ({ isAuthenicated, actionSetMediaScrine }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" })
  actionSetMediaScrine(isTabletOrMobile)
  if (isAuthenicated) {
    return (
      <Router>
        <Switch>
          <Route path='/main' exact>
            <WrappedMainPage />
          </Route>
          <Route path='/list' exact>
            <ListPage address={{ region: { id: "2800000000000", name: "Амурская область" }, building: { name: "" }, zip: "", flat: "" }} />
          </Route>
          <Route path='/p5p6' exact>
            <AddressPart
              title='Ввод: пункты 5,6'
              isDeadPlace={false}
              address={{ region: { id: "2800000000000", name: "Амурская область" }, building: { name: "" }, zip: "", flat: "" }}
              area={null}
            />
          </Route>
          <Route path='/p7p8' exact>
            <AddressPart
              title='Ввод: пункты 7,8'
              isDeadPlace={true}
              address={{ region: { id: "2800000000000", name: "Амурская область" }, building: { name: "" }, zip: "", flat: "" }}
              area={null}
            />
          </Route>
          <Redirect to='/main' />
        </Switch>
      </Router>
    )
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={WrappedLoginPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = state =>{
  return { isAuthenicated: state.auth != null };
}

const mapActionToProps = (dispatch) => {
  return { actionSetMediaScrine: bindActionCreators(actionSetMediaScrine, dispatch) }
}
export default connect(mapStateToProps, mapActionToProps)(Routes)