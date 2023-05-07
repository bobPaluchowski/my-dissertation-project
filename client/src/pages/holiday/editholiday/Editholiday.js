import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"

const Editholiday = (props) => {
    const {modalType}= props

    const handleDate=(value)=>{

// let date= new Date(value[0].unix*1000).toDateString()

props.setChangedField(prev=>({...prev, dates:value}))
    }
    
  return (
    <div>
      <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{modalType==='add'? 'Book for new holiday' : 'Edit holiday info'}</ModalHeader>
      <ModalBody className={modalType==='add'? 'holiday-modal add' : ''}>
      <div className="row pt-2">
  <div className="col-12">
    <div className="col-12">
      
      <div className="d-flex justify-content-center align-items-center">
        {/* <div className="form-validation"> */}
          {modalType==='edit'||modalType==='add'? <form className="form-valide" action="#" method="post">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group row">
                  <label className="col-lg-12 col-form-label" >Select Your Date(s):
                  </label>
                  <div className="col-lg-12">
                  <DatePicker 
      multiple
      sort
      minDate={new Date()}
      value={props.changedField.dates} 
      onChange={date=>handleDate(date)}
      plugins={[
        <DatePanel position="right" />
      ]}
    />
                  </div>
                </div>
                
              
            
              </div>
             
            </div>
          </form>
          :
          <div className='col-12'>
<div className="form-group row">
       <label className="col-lg-12 col-form-label" >Booked By:
       </label>
       <div className="col-lg-12">
         <p className="holiday-display">{props.bookedBy}</p>
       </div>
     </div>

<div className="form-group row">
       <label className="col-lg-12 col-form-label" >Booked Dates:
       </label>
       <div className="col-lg-12">
         <p className="holiday-display">{props.changedField.dates.length>0 && props.changedField.dates.map((el, i, arr)=>
                            (<span key={i} className='row'> {new Date(el-572*1000).toDateString()} </span>)
                            
                            )}</p>
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

export default Editholiday
