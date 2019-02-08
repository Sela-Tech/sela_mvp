import ca from "../../actions/contractor/project"
const init = {
    type: "",
    message:"",
    preview_info: {}
}

export default ( state = init,payload )=>{
    switch (payload.type) {
        case ca.FETCH_P_P_F:
        return { ...state, type: ca.FETCH_P_P_F }
        case ca.FETCH_P_P_R:
        return { ...state, type: ca.FETCH_P_P_R }
        case ca.FETCH_P_P_S:
        return { ...state, type: ca.FETCH_P_P_S, preview_info: payload.data }
        
        default:
        return state;
    }
}