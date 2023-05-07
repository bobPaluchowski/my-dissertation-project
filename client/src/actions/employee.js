import { toast } from 'react-toastify';
import {  userRequest } from '../requestMethod';

export const FETCH_EMPLOYEE_REQUEST = 'FETCH_TEMPLATE_REQUEST';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_FAILURE = 'FETCH_TEMPLATE_FAILURE';
export const EMPLOYEE_EDIT_FAILURE = 'EMPLOYEE_EDIT_FAILURE';
export const TEMPLATE_EDIT_FAILURE = 'TEMPLATE_EDIT_FAILURE';
export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS';
export const FETCH_EMPLOYEE_FAILURE = 'FETCH_EMPLOYEE_FAILURE';



export function fetchEmployee() {
  return async(dispatch) => {
   const {data}= await userRequest.get('/api/user')
   if (data) {
    
        dispatch({type: FETCH_EMPLOYEE_SUCCESS, payload: data});
    }else{
        dispatch({type: FETCH_EMPLOYEE_FAILURE})
    }
   }
  }


export function editEmployee(changedField) {
  return async(dispatch) => {
   const {data}= await userRequest.put(`/api/user/update/${changedField.id}`, {changedField})
  
   if (data.success) {
    toast.success(data.message);
        dispatch(fetchEmployee());
    }else{
        dispatch({type: EMPLOYEE_EDIT_FAILURE})
    }
   }
  }


export function addEmployee(field) {
  return async(dispatch) => {
   try {
    const {data}= await userRequest.post(`/api/user/add`, field)

   if (data) {
    
       await dispatch(fetchEmployee());
        toast.success("Employee added successfully");
    }else{
        dispatch({type: EMPLOYEE_EDIT_FAILURE})
        toast.error("something went wrong");
    }
   } catch (error) {
    toast.error("Duplicate email used, please use a different email");
   }
   }
  }

export function deleteEmployee(id) {
  return async(dispatch) => {
   const {data}= await userRequest.delete(`/api/user/delete/${id}`)
  
   if (data.success) {
    toast.success(data.message);
       await dispatch(fetchEmployee());
        
    }else{
        toast.error("something went wrong");
    }
   }
  }

