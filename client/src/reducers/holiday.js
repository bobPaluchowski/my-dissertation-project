
import {
    FETCH_HOLIDAY_REQUEST,
    FETCH_HOLIDAY_SUCCESS,
    FETCH_HOLIDAY_FAILURE,
    
  } from "../actions/holiday";
  
  export default function holiday(state = {
    isFetching: false,
    errorMessage: '',
    holidayData:[]
  }, action) {
    switch (action.type) {
      case FETCH_HOLIDAY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_HOLIDAY_SUCCESS:
       
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: '',
          holidayData: action.payload
        });
      case FETCH_HOLIDAY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.payload,
        });

       
      default:
        return state;
    }
  }