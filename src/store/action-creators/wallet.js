import Axios from "axios";
import { retrieveToken } from "../../helpers/TokenManager";
import endpoints from "../../endpoints";
import { 
    FETCH_MY_WALLET_R, FETCH_MY_WALLET_S, FETCH_MY_WALLET_F, CLEAR_WALLET,
    FETCH_MY_TRANSACTIONS_R, FETCH_MY_TRANSACTIONS_S, FETCH_MY_TRANSACTIONS_F, FETCH_PROJECT_ASSET_BALANCE_F, FETCH_PROJECT_ASSET_BALANCE_S, FETCH_PROJECT_ASSET_BALANCE_R, FETCH_PROJECT_ASSET_TRANSACTIONS_F, FETCH_PROJECT_ASSET_TRANSACTIONS_S, FETCH_PROJECT_ASSET_TRANSACTIONS_R, TRANSFER_ASSET_R, TRANSFER_ASSET_S, TRANSFER_ASSET_F 
} from "../actions/wallet";


export const clear_wallet = ()=>{
    return {
        type: CLEAR_WALLET
    }
}

export const fetch_my_wallet = () => {
    return dispatch => {
        dispatch({type: FETCH_MY_WALLET_R })
        Axios({
            url: endpoints.r_wallet("self-account-balance"),
            method: "GET",
            headers:{
                authorization: retrieveToken()
            }
        }).then(res => {
            dispatch({type: FETCH_MY_WALLET_S, wallet: res.data })
        }).catch(res=>{
            dispatch({type: FETCH_MY_WALLET_F })
        })
    }
}

export const fetch_my_transactions = (projectId,userId, as) => {
    return dispatch => {
        dispatch({ type: FETCH_MY_TRANSACTIONS_R });
        Axios({
            method: "GET",
            url: endpoints.r_wallet("self-account-transaction-history", projectId),
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: FETCH_MY_TRANSACTIONS_S, data: res.data });
        }).catch(res=>{
            dispatch({ type: FETCH_MY_TRANSACTIONS_F })
    })
    }
}

export const fetch_projectAsset_transaction_history = (projectId) => {
    return dispatch => {
        dispatch({ type: FETCH_PROJECT_ASSET_TRANSACTIONS_R });
        Axios({
            method: "GET",
            url: endpoints.r_wallet("project-transaction-history", projectId),
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: FETCH_PROJECT_ASSET_TRANSACTIONS_S, data: res.data });
        }).catch(res=>{
            dispatch({ type: FETCH_PROJECT_ASSET_TRANSACTIONS_F })
        })
    }
}

export const fetch_projectAsset_balance = (projectId)=>{
    return dispatch => {
        dispatch({ type: FETCH_PROJECT_ASSET_BALANCE_R });
        Axios({
            method: "GET",
            url: endpoints.r_wallet("project-asset-balance", projectId),
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: FETCH_PROJECT_ASSET_BALANCE_S, data: res.data });
        }).catch(res=>{
            dispatch({ type: FETCH_PROJECT_ASSET_BALANCE_F })
        })
    }
}

export const transfer_pst = data =>{
    return dispatch => {
        dispatch({ type: TRANSFER_ASSET_R })
        Axios({
            url: endpoints.r_wallet("transfer"),
            method: "POST",
            data: {
                "projectId": data.projectId,
                "receiver": data.receiver,
                "assetType": data.pstCode,
                "amount": data.amount,
                "remarks": data.remarks
            },
            headers: {
                authorization: retrieveToken()
            }
        }).then(res => {
            dispatch({ type: TRANSFER_ASSET_S })
            dispatch({ type: "NEW_TOAST", status: "success", message: "PST Transferred Successfully."})
            dispatch({type: "CLOSE_MODAL_FORM"});
            dispatch(fetch_projectAsset_transaction_history(data.projectId))
        }).catch(res =>{
            dispatch({ type: "NEW_TOAST", status: "error", message: "Could Not Transfer PST."});
            dispatch({ type: TRANSFER_ASSET_F })            
        })
    }
}