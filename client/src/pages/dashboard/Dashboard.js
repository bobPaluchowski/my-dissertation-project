import React, { useEffect }  from "react";

import {
  Col,
  Row
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";

import Tables from "../tables/Tables";
import CountUp from 'react-countup';
import s from "./Dashboard.module.scss";
import { connect } from "react-redux";
import { fetchMyProfile } from "../../actions/auth.js";
import { fetchEmployee } from "../../actions/employee.js";

import { Link } from "react-router-dom";

import { fetchHoliday } from "../../actions/holiday.js";

import MyCalendar from "../../components/Calendar/Calendar.js";

import userImage from "../../assets/user.png"

const Dashboard = ({profileData, dispatch, employees, holidays}) => {


let today= new Date()
let lastMonth=  today.setDate(today.getDate()-30)

let lastMonthHoliday= holidays.filter(el=> new Date(el.createdAt) > lastMonth)
let pendingHolidayRequests = holidays.filter(el => el.status === "pending");


useEffect(()=>{
 dispatch(fetchMyProfile())
 if ((profileData.role==='admin'|| profileData.role==='manager') ) {
  dispatch(fetchEmployee())
 }
 dispatch(fetchHoliday())

},[dispatch])

  return (
    <div>
      <Row>
        
        <Col className="pr-grid-col" xs={12} lg={8}>

          {/* starting of intro card divs*/}

        <Row className="gutter">

           {profileData && profileData.role==='user' &&  <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>

            <Link to='#/'>
            <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="text-center mb-4">
                  <i className={`fa fa-bank ${s.employeeIcon} ${s.dashboardbankicon}`} style={{color:"#FF5668"}}/>
                  <br/>
                  </div>
                    <div className="d-flex flex-column">
                    <p className="h3 text-center pt-3">
                    <CountUp
                      start={0}
                      end={profileData && profileData.holiday_entitlement}
                      duration={2.3}
                      
                    />                    
                    </p>
                   <span className="h6 muted text-center"> Entitlement</span>
                    </div>
                </div>
              </Widget>
            </Link>
              
              {/* start of pending holiday request */}
              
            </Col>}



           {profileData && profileData.role ==='admin' &&  <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Link to='/template/employee'>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="text-center mb-4">
                  <i className={`eva eva-people ${s.employeeIcon}`} style={{color:"#FFC405"}}></i>                  
                  <br/>
                  </div>
                    <div className="d-flex flex-column">
                    <p className="h3 text-center">
                    <CountUp
                      start={0}
                      end={employees&& employees.length}
                      duration={1.3}
                      
                    />   
                    </p>
                   <span className="h6 muted text-center">Employess</span>
                    </div>
                </div>
              </Widget>
              </Link>
            </Col>}
            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>

              <Link to='/template/viewallholidays'>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="text-center mb-4">
                  <i className={`eva eva-briefcase-outline ${s.employeeIcon}`} style={{color:"#41D5E2"}}></i>
                  <br/>
                  </div>
                    <div className="d-flex flex-column">
                    <p className="h3 text-center">
                    <CountUp
                      start={0}
                      end={holidays && holidays.reduce((a,b)=>a+ b.totalDays,0)}
                      duration={2}
                      
                    />   
                    </p>
                   <span className="h6 muted text-center">Total Holidays</span>
                    </div>
                </div>
              </Widget>
              </Link>
            </Col>
            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="text-center mb-4">
                  <i className={`eva eva-calendar-outline ${s.employeeIcon}`} style={{color:"#4D53E0"}}></i>
                  <br/>
                  </div>
                    <div className="d-flex flex-column">
                    <p className="h3 text-center">
                    <CountUp
                      start={0}
                      end={lastMonthHoliday && lastMonthHoliday.reduce((a,b)=>a+ b.totalDays,0)}
                      duration={2.3}  
                    />   
                    </p>
                   <span className="h6 muted text-center">Holidays<br/>(Last month)</span>
                    </div>
                </div>
              </Widget>
            </Col>

{/* PENDING */}

{profileData && profileData.role === 'admin' && (
    <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
      <Link to="/template/pending-holidays">
        <Widget className="widget-p-sm">
          <div className={s.smallWidget}>
            <div className="text-center mb-4">
              <i
                className={`eva eva-clock-outline ${s.employeeIcon}`}
                style={{ color: "#FF8C00" }}
              ></i>
              <br />
            </div>
            <div className="d-flex flex-column">
              <p className="h3 text-center">
                <CountUp
                  start={0}
                  end={pendingHolidayRequests.length}
                  duration={2.3}
                />
              </p>
              <span className="h6 muted text-center">
                Pending Holiday Requests
              </span>
            </div>
          </div>
        </Widget>
      </Link>
    </Col>
  )}

  {/* END OF PENDING */}

          </Row>

          {/* ending of intro card divs*/}


          {/* Starting of chart*/}
           <Row className="gutter mb-4 mt-4">
            <Col className="mb-4 mb-md-0" xs={12} md={12}>
              <Widget className="">
                <div className="d-flex justify-content-between widget-p-md">
                  </div>
                  
              </Widget>
            </Col>

          </Row>

          {/* ending of chart*/}


{profileData&& profileData.role !=='user' && <Tables holidays={holidays}></Tables>}


{/*starting of slider */}


          </Col>
     

  <Col className="mt-4 mt-lg-0" xs={12} lg={4}>
   <div className={`pb-4 ${s.widgetColor}`} >
    
   <div className="d-flex p-4">
              {/* <img className={s.image} src={'https://i.ibb.co/3MWD2XV/userpic.png'} alt="user" /> */}
              <img className={s.image} src={userImage} alt='user' />
              <div className={s.userInfo}>
                <p className="headline-3">{profileData.firstname + ' '+ profileData.lastname}</p>
                <p className="body-3 muted">{profileData.location && profileData.location}</p>
              </div>
            </div>
      
      <div className="profile-personal-info pl-4">
   <div>

  
  <div className="row mb-2 ">
    <div className="col-xs-6 col-sm-6 col-xl-3">
      <span className="headline-3">Email
        <span className="pl-2 pr-2">:</span>
        </span>
        </div>
        <div  className="col-xs-6 col-sm-6 col-xl-9">
        <span className="body-2 muted">{profileData.email}</span>
        </div>
      
   
  </div>
  <div className="row mb-2 ">
    <div className="col-xs-6 col-sm-6 col-xl-3">
      <span className="headline-3">Role
        <span className="pl-2 pr-2">:</span>
        </span>
        </div>
        <div  className="col-xs-6 col-sm-6 col-xl-9">
        <span className="body-2 muted">{profileData.role} </span>
        </div>
      
   
  </div>
  <div className="row mb-2 ">
    <div className="col-xs-6 col-sm-6 col-xl-3">
      <span className="headline-3">Site
        <span className="pl-2 pr-2">:</span>
        </span>
        </div>
        <div className="col-xs-6 col-sm-6 col-xl-9">
        <span className="body-2 muted">
          {profileData.site && profileData.site}
       
          </span>
     
    </div>
  </div>

  
</div>
</div>

    </div>


  </Col>

      </Row>
      {profileData && profileData.role==='user' &&
      // <div style={{height:"500px",width:"1000px",marginLeft:"auto",marginRight:"auto", paddingTop:"60px",paddingBottom:"60px"}}>
      // <h3 style={{marginBottom:"30px"}}>View your booked holidays</h3>
      // <MyCalendar holidays={holidays}/>
      // </div>
      <MyCalendar holidays={holidays}/>

      }
    </div>
    
  )
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profileData: state.myprofile.profileData,
    employees: state.employee.employeeData,
    holidays: state.holiday.holidayData,
    
  };
}

export default connect(mapStateToProps)(Dashboard);

