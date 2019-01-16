import organizations from "../actions/organizations";
import Axios from "axios";
import endpoints from "../../endpoints";
import { extractMessage } from "../../helpers/utils";

export const fetchOrganizations = () => {
  return async dispatch => {
    dispatch({ type: organizations.GET_ORGANIZATION_IN_PROGESS });
    try {
      let res = await Axios({
        url: endpoints.fetch_organizations,
        method: "GET"
      });

      dispatch({
        type: organizations.GET_ORGANIZATIONS_S,
        data: res.data
      });
    } catch (e) {
      dispatch({
        type: organizations.GET_ORGANIZATIONS_F,
        message: extractMessage( e.message )
      });
    }
  };
};
