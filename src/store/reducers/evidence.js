import * as evidenceActions from "../actions/evidence";

const init = {
    type: "",
    kpis: []
}

export default (state=init, payload)=>{
    switch (payload.type) {

        case evidenceActions.SPECIFY_KPI_R:
        return {
            ...state,
            type: evidenceActions.SPECIFY_KPI_R
        };

        case evidenceActions.SPECIFY_KPI_S:
        return {
            ...state,
            type: evidenceActions.SPECIFY_KPI_S
        };

        case evidenceActions.SPECIFY_KPI_F:
        return {
            ...state,
            type: evidenceActions.SPECIFY_KPI_F
        };
        
        case evidenceActions.RETRIEVE_KPIS_R:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_KPIS_R
        };

        case evidenceActions.RETRIEVE_KPIS_S:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_KPIS_S,
            kpis: payload.kpis
        };

        case evidenceActions.RETRIEVE_KPIS_F:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_KPIS_F
        };
        
    
        default:
            return state;
    }
}