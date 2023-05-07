import { combineReducers } from "redux";
import navigation from "./navigation.js";
import register from "./register.js";
import auth from "./auth.js";
import employee from "./employee.js";
import holiday from "./holiday.js";
import myprofile from "./myprofile.js";


export default combineReducers({
  register,
  auth,
  navigation,
  employee,
  holiday,
  myprofile,
 
});