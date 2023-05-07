/*
Author: Robert Paluchowski
Contact: rpaluchowski77@gmail.com
web: https://github.com/bobPaluchowski
Linkedin: https://www.linkedin.com/in/robert-paluchowski-16a370185/

*/

// -- React and related libs
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";


// -- Redux
import { connect } from "react-redux";

// -- Custom Components
import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";


// -- Redux Actions
import { logoutUser } from "./actions/auth";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// -- Services
import isAuthenticated from "./services/authService";

// -- Component Styles
import "./styles/app.scss";
import NotPermission from "./pages/error/NotPermission";
import Dashboard from "./pages/dashboard/Dashboard";




const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))) {
    dispatch(logoutUser());
    return (<Redirect to="/login" />)
  } else {
    return (
      <Route { ...rest } render={props => (React.createElement(component, props))} />
    );
  }
};

const App = (props) => {
  return (
    <div>
      <ToastContainer position="top-right"
autoClose={1000}
/>

      <HashRouter>
      
        <Switch>
      
          <Route path="/" exact render={() => <Redirect to="/template/dashboard" />} />
          <Route path="/template" exact render={() => <Redirect to="/template/dashboard"/>}/>
          <PrivateRoute path="/template" dispatch={props.dispatch} component={LayoutComponent} />
          <Route path="/login" exact component={Login} />
          {/* <Route path="/login" exact render={Dashboard} /> */}
         <Route path="/error" exact component={ErrorPage} />
         
         <Route path="/notpermission" exact component={NotPermission} />
          <Route path="/secretadminregister" exact component={Register} />
          <Route component={ErrorPage}/>
          <Route path='*' exact={true} render={() => <Redirect to="/error" />} />
        </Switch>
      </HashRouter>
      <ToastContainer/>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
