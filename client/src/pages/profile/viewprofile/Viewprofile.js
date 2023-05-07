import React, { useEffect }  from "react";
import { connect } from "react-redux";
import { fetchMyProfile } from "../../../actions/auth"
import {Link} from 'react-router-dom'

import './Viewprofile.css'

import userImage from "../../../assets/user.png";


function Viewprofile({profileData, dispatch}) {
  

    useEffect(()=>{
      dispatch(fetchMyProfile())
     },[dispatch])


  return (
    <div>
<div className="container">
  <div className="main-body">
 
    {/* /Breadcrumb */}
    <div className="row gutters-sm">
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              {/* <img src="https://i.ibb.co/3MWD2XV/userpic.png" alt="Admin" className="rounded-circle" width={150} /> */}
              <img className="rounden-circle" width={150} src={userImage} alt='user' />

              <div className="mt-3">
                <h4>{profileData.firstname+' '+profileData.lastname}</h4>
                <p className="text-secondary mb-1">{profileData.role} Account</p>
                <p className="text-muted font-size-sm">{profileData.location}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="col-md-8">
        <div className="card mb-3 pt-2">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">First Name</h6>
              </div>
              <div className="col-sm-9 body-2 muted">
                {profileData.firstname}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Last Name</h6>
              </div>
              <div className="col-sm-9 body-2 muted">
                {profileData.lastname ? profileData.lastname : 'Not added yet'}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 body-2 muted">
                {profileData.email}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Location</h6>
              </div>
              <div className="col-sm-9 body-2 muted">
                {profileData.location ? profileData.location : 'Not added yet'}
              </div>
            </div>
            <hr />
        
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Site</h6>
              </div>
              <div className="col-sm-9 body-2 muted">
                {profileData.site ? profileData.site : 'Not added yet'}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
                <Link to='/template/editprofile' className="btn btn-primary rounded-pill mx-auto ">Edit</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


    </div>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profileData: state.myprofile.profileData
  };
}

export default connect(mapStateToProps)(Viewprofile);
