// import ax from "axios";
// import { extractMessage } from "../../helpers/utils";
import {toast} from 'react-toastify';
import app from '../actions/app';

export const notify = (message,type,obj) => toast[type](message,obj);
export const reset_error_boundary = () => ({type: app.RESET_ERROR_BOUNDARY})