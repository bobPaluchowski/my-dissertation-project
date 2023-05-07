import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const Editemployee = (props) => {
    const {modalType}= props
  return (
    <div>
      <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{modalType==='add'? 'Add Employee' : 'Edit Employee info'}</ModalHeader>
      <ModalBody>
      <div className="row pt-2">
  <div className="col-12">
    <div className="col-12">
      
      <div className="d-flex justify-content-center align-items-center">
        {/* <div className="form-validation"> */}
          {modalType==='edit'||modalType==='add'? <form className="form-valide" action="#" method="post">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >First name:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className="form-control" id="val-username" name="val-username" placeholder="Enter first name.." value={props.changedField.firstname}  onChange={(e)=>props.setChangedField(prev=>({...prev, firstname:e.target.value}))} required/>
                  </div>
                </div>
                
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >Last name:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className="form-control" id="val-lastname" name="lastname" placeholder="Enter last name.." value={props.changedField.lastname}  onChange={(e)=>props.setChangedField(prev=>({...prev, lastname:e.target.value}))} required/>
                  </div>
                </div>
                
                
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Email:
                  </label>
                  <div className="col-lg-8">
                    <input type="email" className="form-control" id="val-email" name="password" placeholder="Email" value={props.changedField.email}  onChange={(e)=>props.setChangedField(prev=>({...prev, email:e.target.value}))} required/>
                  </div>
                </div>

                {modalType==='add'&& <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Password:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className="form-control" id="val-pass" name="password" placeholder="Password" value={props.changedField.password}  onChange={(e)=>props.setChangedField(prev=>({...prev, password:e.target.value}))} required minLength={8} maxLength={16}/>
                  </div>
                </div>}


                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Holiday Entitlement:
                  </label>
                  <div className="col-lg-8">
                    <input type="email" className="form-control" id="val-entitle" name="holiday_entitlement" placeholder="Holiday entitlement" value={props.changedField.holiday_entitlement}  onChange={(e)=>props.setChangedField(prev=>({...prev, holiday_entitlement:e.target.value}))} required/>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Location:
                  </label>
                  <div className="col-lg-8">
                    {/* <input type="email" className="form-control" id="val-entitle" name="location" placeholder="Location" value={props.changedField.location}  onChange={(e)=>props.setChangedField(prev=>({...prev, location:e.target.value}))} required/> */}

                    <select name='location' defaultValue={props.changedField.location} onChange={(e)=>props.setChangedField(prev=>({...prev, location:e.target.value}))} className="custom-select custom-select-sm">
                    {modalType==='add' &&  <option defaultValue={'Select a location'} defaultChecked={props.changedField.location===''}>Select a location </option>}
  <option  defaultValue={"home"}>home</option>
  <option  defaultValue={"office"}>office</option>
  
</select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Site:
                  </label>
                  <div className="col-lg-8">
                    

                    <select name='site' onChange={(e)=>props.setChangedField(prev=>({...prev, site:e.target.value}))} defaultValue={props.changedField.site} className="custom-select custom-select-sm">
 {modalType==='add' &&  <option defaultValue={'Select site'} defaultChecked={props.changedField.site===''}>Select site </option>}
 
 <option defaultValue={"main_site"}>main_site</option>
  <option defaultValue={"field_office"}>field_office</option>
  
</select>
                  </div>
                </div>
                
               
                
                

            
              </div>
             
            </div>
          </form>
          :
          <div className='col-12'>
<div className="form-group row">
       <label className="col-lg-4 col-form-label" >Name:
       </label>
       <div className="col-lg-8">
         <p className="">{props.changedField.firstname + ' '+props.changedField.lastname}</p>
       </div>
     </div>

     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >Email:
       </label>
       <div className="col-lg-8">
         <p className="mt-1">{props.changedField.email}</p>
       </div>
     </div>
     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >Location:
       </label>
       <div className="col-lg-8">
         <p className="mt-1">{props.changedField.location}</p>
       </div>
     </div>
     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >Site:
       </label>
       <div className="col-lg-8">
         <p className="mt-1">{props.changedField.site}</p>
       </div>
     </div>
     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >Entitlement:
       </label>
       <div className="col-lg-8">
         <p className="mt-1">{props.changedField.holiday_entitlement}</p>
       </div>
     </div>
</div>
 }
        {/* </div> */}
      </div>
    </div>
  </div>

</div>
      </ModalBody>
      <ModalFooter>
       
        <Button color="secondary" onClick={props.toggle}>
          {modalType==='edit' ?'Cancel' : 'Close'}
        </Button>{' '}
       {modalType !=='view' &&  <Button color="primary" onClick={modalType==='edit'?props.editsubmit : props.addSubmit}>
          Submit
        </Button>}
      </ModalFooter>
    </Modal>

</div>
  )
}

export default Editemployee
