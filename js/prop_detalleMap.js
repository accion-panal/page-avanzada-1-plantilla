import apiCallMapDetail from "./propiedad/apiMapDetalle.js";
import { UserData } from "./userId.js";

const url = window.location.search; 
const value = url.match(/\d+/)[0];
const {statusId,companyId} = UserData;

apiCallMapDetail(value,statusId,companyId);