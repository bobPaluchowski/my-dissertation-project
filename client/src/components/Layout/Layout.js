/*
Author: Robert Paluchowski
Contact: rpaluchowski@gmail.com
web: https://github.com/bobPaluchowski
Linkedin: https://www.linkedin.com/in/robert-paluchowski-16a370185/

*/

// -- React and related libs
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs
import PropTypes from "prop-types";

// -- Custom Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

import Dashboard from "../../pages/dashboard/Dashboard";


import Tables from "../../pages/tables/Tables";


import Viewallholiday from '../../pages/holiday/viewallholiday/Viewallholiday'

import Viewprofile from '../../pages/profile/viewprofile/Viewprofile'
import Editprofile from '../../pages/profile/editprofile/Editprofile'
// -- Component Styles
import s from "./Layout.module.scss";
import Viewallemployee from "../../pages/employee/viewallemployee/Viewallemployee";
import { fetchMyProfile } from "../../actions/auth";





const PermitedRoute = ({ dispatch, role, component, ...rest }) => {


  return (<Route { ...rest } render={props => (React.createElement(component, props))} />)


  // if (role !== 'admin') {
  //   // dispatch(logoutUser());
  //   return (<Redirect to="/notpermission" />)
  // } else {
  //   return (
  //     <Route { ...rest } render={props => (React.createElement(component, props))} />
  //   );
  // }
};

const Layout = (props) => {
const {dispatch}= props;
  useEffect(()=>{
    dispatch(fetchMyProfile())
   
   },[dispatch])
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar role={props.profileData.role}/>
        <main className={s.content}>
         
          <Switch>
            <Route path="/template" exact render={() => <Redirect to="template/dashboard"/>} />
            <Route path="/template/dashboard"  exact component={Dashboard}/>
            
            <Route path="/template/tables" exact component={Tables} />
           
           

           
            <PermitedRoute path="/template/employee" dispatch={props.dispatch} role={props.profileData.role} exact component={Viewallemployee} />
           
          
            <Route path="/template/viewallholidays" exact component={Viewallholiday} />
        
            <Route path="/template/viewprofile" exact component={Viewprofile} />
            <Route path="/template/editprofile" exact component={Editprofile} />

            <Route path='*' exact render={() => <Redirect to="/error" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    profileData: store.myprofile.profileData,

  };
}

export default withRouter(connect(mapStateToProps)(Layout));
