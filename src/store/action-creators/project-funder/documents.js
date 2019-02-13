import ax from "axios";
import dA from "../../actions/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";
import { extractMessage } from "../../../helpers/utils";
import modal from "../../actions/modal";
import { fetchProject } from "../project";

export const addDoc = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_DOCUMENT_R });
    ax({
      url: e.add_document,
      method: "POST",
      data: obj,
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(() => {
        dispatch({
          type: dA.ADD_DOCUMENT_S
        });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Document Added Successfully"});
        dispatch({type: modal.CLOSE_MODAL_FORM})
        dispatch(fetchProject(obj.id || obj.projectId));

      })
      .catch((res) => {
        dispatch({ type: dA.ADD_DOCUMENT_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Add Document"})
      });
  };
};
