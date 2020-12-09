import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import MainPage from "./pages/MainPage"
import WrappedLoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage"
import {connect} from "react-redux" 

const Routes = ({isAuthenicated}) => {
  if (isAuthenicated) {
    return (
      <Router>
        <Switch>
          <Route path="/main" exact>
            <MainPage />
          </Route>
          <Route path="/list" exact>
            <ListPage />
          </Route>
          <Redirect to="/main" />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={WrappedLoginPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state =>{
  return { isAuthenicated: state.auth != null };
}
export default connect(mapStateToProps, null)(Routes)