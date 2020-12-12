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

const Routes = ({ isAuthenicated, actionSetMediaScrine }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" })
  actionSetMediaScrine(isTabletOrMobile)
  if (isAuthenicated) {
    return (
      <Router>
        <Switch>
          <Route path="/main" exact>
            <WrappedMainPage  />
          </Route>
          <Route path="/list" exact>
            <ListPage />
          </Route>
          <Redirect to="/main" />
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