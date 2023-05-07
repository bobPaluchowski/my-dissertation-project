import { toast } from 'react-toastify';
import {  userRequest } from '../requestMethod';

export const FETCH_TEMPLATE_REQUEST = 'FETCH_TEMPLATE_REQUEST';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_FAILURE = 'FETCH_TEMPLATE_FAILURE';
export const HOLIDAY_EDIT_FAILURE = 'HOLIDAY_EDIT_FAILURE';
export const TEMPLATE_EDIT_FAILURE = 'TEMPLATE_EDIT_FAILURE';
export const FETCH_HOLIDAY_REQUEST = 'FETCH_HOLIDAY_REQUEST';
export const FETCH_HOLIDAY_SUCCESS = 'FETCH_HOLIDAY_SUCCESS';
export const FETCH_HOLIDAY_FAILURE = 'FETCH_HOLIDAY_FAILURE';



export function fetchHoliday() {
  return async(dispatch) => {
   const {data}= await userRequest.get('/api/holiday')
   if (data) {
    
        dispatch({type: FETCH_HOLIDAY_SUCCESS, payload: data});
    }else{
        dispatch({type: FETCH_HOLIDAY_FAILURE})
    }
   }
  }


export function editHoliday(changedField) {
  return async(dispatch) => {
   const {data}= await userRequest.put(`/api/holiday/update/${changedField.id}`, {changedField})
  
   if (data.success) {
    toast.success(data.message);
        dispatch(fetchHoliday());
    }else{
        dispatch({type: HOLIDAY_EDIT_FAILURE})
    }
   }
  }


export function addHoliday(field) {
  return async(dispatch) => {
   try {
    const {data}= await userRequest.post(`/api/holiday/add`, field)

   if (data) {
    
       await dispatch(fetchHoliday());
        toast.success("Holiday added successfully");
    }else{
        dispatch({type: HOLIDAY_EDIT_FAILURE})
        toast.error("something went wrong");
    }
   } catch (error) {
    toast.error("something went wrong");
   }
   }
  }

export function deleteHoliday(id) {
  return async(dispatch) => {
   const {data}= await userRequest.delete(`/api/holiday/delete/${id}`)
  
   if (data.success) {
    toast.success(data.message);
       await dispatch(fetchHoliday());
        
    }else{
        toast.error("something went wrong");
    }
   }
  }

