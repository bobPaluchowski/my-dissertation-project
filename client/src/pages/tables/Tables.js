
import React from "react";
import {Link} from 'react-router-dom'
import {
  Col,
  Row,
  
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";



import s from "./Tables.module.scss";


const Tables = function ({holidays }) {



  return (
    <div>

          <Row>
            <Col xs={12} xl={12} className="pr-grid-col">
              <Widget>
               {holidays&& 
               <> <div className={s.tableTitle}>
                  <div className="headline-2">Recent Holidays Booking</div>
                  <div>
                  <button className="btn btn-primary rounded-pill mx-auto logout-btn py-1 px-3" type="submit">
                    <span className="ml-1 viewall-btn"><Link to='/template/viewallholidays'>View All</Link></span></button>
                    {/*<img src="" alt="Filter option"/>*/}
                  </div>
                </div>
                <div className={s.widgetContentBlock}>
                  {holidays && holidays.slice(0,3).map(item => (
                    <div key={item._id} className={s.content}>
                    <div className="col-12">
                    <div className="body-3 muted d-none d-md-block ">No.of Date Booked: {item.totalDays}</div>
                    <div className="body-2 ">Booked By: {item.employee.firstname +' '+ item.employee.lastname}</div>
                    {/* <div className="body-3 muted d-none d-lg-block ">Email: {item.email}</div> */}

                    </div>
                
                  </div>
                  ))}
                </div></>}

                
              </Widget>
            </Col>
       
          </Row>

    </div>
  )
}

export default Tables;
