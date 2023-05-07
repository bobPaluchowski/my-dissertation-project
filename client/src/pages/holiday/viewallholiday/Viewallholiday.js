import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,

} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";


import '../../business/viewallbusiness/Viewallbusiness.css'

import s from "../../tables/Tables.module.scss";



import { connect } from "react-redux";

import {  deleteEmployee, editEmployee } from "../../../actions/employee.js";
import { toast } from "react-toastify";
import { addHoliday, deleteHoliday, fetchHoliday } from "../../../actions/holiday.js";
import Editholiday from "../editholiday/Editholiday.js";




const Tables = function (props) {
  const [modalShow, setModalShow] = useState(false);
  const [changedField, setChangedField] = useState({id:'', dates:[], });
  const [bookedBy, setBookedBy] = useState('');


  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [modalType, setModalType] = useState('edit');


 
  const pageSize = 10;
  const {holidayData}= props.holidayDetails
  const {dispatch, profileDetails}= props
  const firstTablePagesCount = Math.ceil(holidayData.length / pageSize);

useEffect(()=>{
 dispatch(fetchHoliday())

},[dispatch])


  const handleEdit= (item) => {
    setModalType('edit')
   setChangedField(prev=>({...prev, id: item._id, firstname: item.firstname,lastname: item.lastname,email: item.email, site: item.site, location: item.location,holiday_entitlement: item.holiday_entitlement}))
  setModalShow(true)
  }
  const handleView= (item) => {
    setModalType('view')
    setBookedBy(`${item.employee.firstname+' '} ${item.employee.lastname}`)
    setChangedField(prev=>({...prev, id: item._id, dates: item.dates}))
  setModalShow(true)
  }
  const toggleModal = () => setModalShow(!modalShow);

  
  const editSubmit= ()=>{
    
      props.dispatch(editEmployee(changedField))
      setModalShow(false)
    
   
  }
  const addSubmit= ()=>{
    if ( changedField.dates.length<1) {
        toast.error("Please pick some date(s)");
        return
    }
    
   
    if (1) {
    props.dispatch(addHoliday(changedField))
    setModalShow(false)
    setChangedField({id:'', dates:[]})
    }else{
      toast.error("You can not book holiday.");
    }

  }

  const handleDelete= (id)=>{
    props.dispatch(deleteHoliday(id))
    
  }
  const handleAdd= ()=>{
    setChangedField({id:'', dates:[]})
    setModalShow(true)
    setModalType('add')
    // props.dispatch(deleteEmployee(id))
    
  }

  const setFirstTablePage = (e, index) => {
    e.preventDefault();
    setFirstTableCurrentPage(index);
  }


  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4 m-md-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">{profileDetails&& profileDetails.role==='user'? 'My Holiday Booking History' : 'Holiday Booking History'}</div>
                 {profileDetails && profileDetails.role ==='user' &&  <div><button type="button" className="btn btn-success p-1 pr-2 pl-2" onClick={handleAdd} ><i className="fa fa-plus actionicon"></i> Book New</button></div>}
             
                </div>
                <div className="widget-table-overflow p-4">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead>
                    <tr>
                     
                     {profileDetails&& profileDetails.role !=='user' &&  <th className="w-25">Booked BY</th> }
                     
                      <th className="w-25">Booked on</th>
                      <th className="w-25">Booked Dates</th>
                      

                      
                  
                      <th className="w-25 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {holidayData && holidayData
                      .slice(
                        firstTableCurrentPage * pageSize,
                        (firstTableCurrentPage + 1) * pageSize
                      )
                      .map(item => (
                        <tr key={item._id}>
                      
                          {profileDetails&& profileDetails.role !=='user' && <td>{item.employee.firstname +' '+item.employee.lastname}</td>}
                          
                          <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                          <td className="holiday-date-holder">
                            {
                            item.dates.length>3? item.dates.map((el, i, arr)=>
                            (<span className="badge badge-info"> {new Date(el-572*1000).toDateString().slice(3,15)}    {i !== (arr.length-1) ? ', ' : ' ...'}</span>)
                            
                            ):
                            item.dates.map((el, i, arr)=>
                            (<span key={i} className="badge badge-info"> {new Date(el-572*1000).toDateString().slice(3,15)}    {i !== (arr.length-1) ? ', ' : ''}</span>)
                            
                            )
                          }
                          </td>
                          
                        
                          <td className="d-flex actionBtn"> 
                            <button type="button" className="btn btn-primary view-btn" title="view details" onClick={() =>handleView(item)}><i className="fa fa-eye actionicon"></i></button>
                            
                           {profileDetails&& profileDetails.role==='admin' &&  <button type="button" className="btn btn-danger delete-btn" onClick={() =>handleDelete(item._id)} ><i className="fa fa-solid fa-trash actionicon"></i>
 
 </button>}
                            {/* <button type="button" className="btn btn-success" onClick={() =>handleEdit(item)}><i className="fa fa-edit actionicon"></i></button>
                             */}

                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {modalShow && <Editholiday  show={modalShow} changedField={changedField} bookedBy={bookedBy} setChangedField={setChangedField} modalType={modalType} toggle={toggleModal} editsubmit={editSubmit} addSubmit={addSubmit}/>}

                  {firstTablePagesCount >1 && <Pagination className="pagination-borderless mt-2" aria-label="Page navigation example">
                    <PaginationItem disabled={firstTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={e => setFirstTablePage(e, firstTableCurrentPage - 1)}
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(firstTablePagesCount)].map((page, i) =>
                      <PaginationItem active={i === firstTableCurrentPage} key={i}>
                        <PaginationLink onClick={e => setFirstTablePage(e, i)} href="#top">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={firstTableCurrentPage >= firstTablePagesCount - 1}>
                      <PaginationLink
                        onClick={e => setFirstTablePage(e, firstTableCurrentPage + 1)}
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>}


                </div>
              </Widget>
            </Col>
          </Row>
         
        </Col>
      </Row>
    </div>
  )
}

Tables.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    
    holidayDetails: state.holiday,
    profileDetails: state.myprofile.profileData,
    
  };
}

export default connect(mapStateToProps)(Tables);
