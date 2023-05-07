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
import Editemployee from "../editholiday/Editemployee.js";
import { addEmployee, deleteEmployee, editEmployee, fetchEmployee } from "../../../actions/employee.js";
import { toast } from "react-toastify";




const Tables = function (props) {
  const [modalShow, setModalShow] = useState(false);
  const [changedField, setChangedField] = useState({id:'', firstname:'', lastname:'', email:'',password:'', location:'', site:'', holiday_entitlement:''});


  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [modalType, setModalType] = useState('edit');


 
  const pageSize = 10;
  const {employeeData}= props.employeeDetails
  const {dispatch, profileDetails}= props
  const firstTablePagesCount = Math.ceil(employeeData.length / pageSize);

useEffect(()=>{
 dispatch(fetchEmployee())

},[dispatch])


  const handleEdit= (item) => {
    setModalType('edit')
   setChangedField(prev=>({...prev, id: item._id, firstname: item.firstname,lastname: item.lastname,email: item.email, site: item.site, location: item.location,holiday_entitlement: item.holiday_entitlement}))
  setModalShow(true)
  }
  const handleView= (item) => {
    setModalType('view')
    setChangedField(prev=>({...prev, id: item._id, firstname: item.firstname, lastname: item.lastname, email: item.email, location: item.location, site: item.site}))
  setModalShow(true)
  }
  const toggleModal = () => setModalShow(!modalShow);

  
  const editSubmit= ()=>{
    
      props.dispatch(editEmployee(changedField))
      setModalShow(false)
    
   
  }
  const addSubmit= ()=>{
    if (!changedField.email || !changedField.firstname || !changedField.holiday_entitlement) {
        toast.error("Please fill all fields");
        return
    }
    if (changedField.site==='' || changedField.site==='Select site') {
      toast.error("Please select a site");
    }
    if (changedField.location==='' || changedField.location==='Select a location') {
      toast.error("Please select a location");
    }

    if (1) {
    props.dispatch(addEmployee(changedField))
    setModalShow(false)
    setChangedField({id:'', firstname:'', lastname:'', email:'',password:'', location:'', site:'', holiday_entitlement:''})
    }else{
      toast.error("You can not add employee.");
    }

  }

  const handleDelete= (id)=>{
    props.dispatch(deleteEmployee(id))
    
  }
  const handleAdd= ()=>{
    setChangedField({id:'', firstname:'', lastname:'', email:'',password:'', location:'', site:'', holiday_entitlement:''})
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
                  <div className="headline-2">Employee List</div>
                 {profileDetails && profileDetails.role ==='admin' &&  <div><button type="button" className="btn btn-success p-1 pr-2 pl-2" onClick={handleAdd} ><i className="fa fa-plus actionicon"></i> Add</button></div>}
             
                </div>
                <div className="widget-table-overflow p-4">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead>
                    <tr>
                     
                      <th className="w-25">Name</th>
                      <th className="w-25">Email</th>
                      <th className="w-25">Location</th>
                      <th className="w-25">Site</th>
                      <th className="w-25">Entitlement</th>

                      
                  
                      <th className="w-25 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employeeData && employeeData
                      .slice(
                        firstTableCurrentPage * pageSize,
                        (firstTableCurrentPage + 1) * pageSize
                      )
                      .map(item => (
                        <tr key={item._id}>
                      
                          <td className="d-flex align-items-center"><span className="ml-3">{item.firstname + ' '+item.lastname}</span></td>
                          <td>{item.email}</td>
                          <td>{item.location}</td>
                          <td>{item.site}</td>
                          <td>{item.holiday_entitlement}</td>
                        
                          <td className="d-flex actionBtn"> 
                            <button type="button" className="btn btn-primary" onClick={() =>handleView(item)}><i className="fa fa-eye actionicon"></i></button>
                            <button type="button" className="btn btn-success" onClick={() =>handleEdit(item)}><i className="fa fa-edit actionicon"></i></button>
                            <button type="button" className="btn btn-danger" onClick={() =>handleDelete(item._id)} ><i className="fa fa-solid fa-trash actionicon"></i>
 
                            </button></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {modalShow && <Editemployee  show={modalShow} changedField={changedField} setChangedField={setChangedField} modalType={modalType} toggle={toggleModal} editsubmit={editSubmit} addSubmit={addSubmit}/>}

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
    
    employeeDetails: state.employee,
    profileDetails: state.myprofile.profileData,
    
  };
}

export default connect(mapStateToProps)(Tables);
