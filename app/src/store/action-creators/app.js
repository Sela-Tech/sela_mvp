import ax from "axios";
import { extractMessage } from "../../helpers/utils";
import {toast} from 'react-toastify';

export const fetchSGDs = () => {
  return dispatch => {
    dispatch({
      type: "FINDING_SDGS"
    });
    ax({
      url:
        "https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=true",
      method: "GET"
    })
      .then(({ data }) => {
        dispatch({
          type: "FOUND_SGDS",
          list: data
        });
      })
      .catch(res => {
        dispatch({
          type: "COULD_NOT_FIND_SGDS",
          message: extractMessage(res)
        });
      });
  };
};


export const notify = (message,type,obj) => toast[type](message,obj);
