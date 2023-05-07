import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMyProfile, myProfileEdit } from '../../../actions/auth'

function Editprofile({profileData, dispatch}) {
 
  useEffect(()=>{
    dispatch(fetchMyProfile())
    
   },[dispatch,profileData])

   const handleSubmit=(e)=>{
e.preventDefault();
const firstname = e.target.firstname.value
const lastname = e.target.lastname.value

dispatch(myProfileEdit({firstname, lastname}))



   }

  return (
    <div>
           <div>
         <div className="row">
  <div className="col-lg-12">
    <div className="card">
      
      <div className="card-body">
        <div className="form-validation">
          <form className="form-valide" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xl-6">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >First Name
                  </label>
                  <div className="col-lg-6">
                    <input type="text"className="form-control" name='firstname'  defaultValue={profileData.firstname} autoComplete='off' />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Last Name
                  </label>
                  <div className="col-lg-6">
                    <input type="text"className="form-control"  name="lastname" defaultValue={profileData.lastname && profileData.lastname} />
                  </div>
                </div>
               
           
                
              </div>
              
              <div className="col-xl-6">
              <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Email 
                  </label>
                  <div className="col-lg-6">
                    <input type="text"className="form-control" disabled  name="email" defaultValue={profileData.email} />
                  </div>
                  
                </div>
               
                
       
              </div>
             
            </div>
            <div className="">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                  <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit"><span className="ml-1">Submit</span></button>

                  </div>
                </div>
          </form>
        
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

export default connect(mapStateToProps)(Editprofile);
