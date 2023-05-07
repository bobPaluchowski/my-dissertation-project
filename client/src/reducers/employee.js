import { FETCH_EMPLOYEE_FAILURE, FETCH_EMPLOYEE_REQUEST, FETCH_EMPLOYEE_SUCCESS } from "../actions/employee.js";

  
  export default function employee(state = {
    isFetching: false,
    errorMessage: '',
    employeeData:[]
  }, action) {
    switch (action.type) {
      case FETCH_EMPLOYEE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_EMPLOYEE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: '',
          employeeData: action.payload
        });
      case FETCH_EMPLOYEE_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.payload,
        });

       
      default:
        return state;
    }
  }