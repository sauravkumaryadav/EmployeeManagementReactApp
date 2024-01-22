import {createStore} from "redux";
import EmployeeReducer from "./EmployeeOperations/EmployeeReducer";
const store = createStore(EmployeeReducer);
export default store;