import Axios from "axios";
import { retrieveToken } from "../../helpers/TokenManager";
import endpoints from "../../endpoints";
import { 
    FETCH_MY_WALLET_R, FETCH_MY_WALLET_S, FETCH_MY_WALLET_F, CLEAR_WALLET,
    FETCH_MY_TRANSACTIONS_R, FETCH_MY_TRANSACTIONS_S, FETCH_MY_TRANSACTIONS_F 
} from "../actions/wallet";


export const clear_wallet = ()=>{
    return {
        type: CLEAR_WALLET
    }
}

export const fetch_my_wallet = (data,userId, type) =>{
    return dispatch => {
        dispatch({type: FETCH_MY_WALLET_R })
        Axios({
            url: endpoints.wallet(),
            data:{
                data, userId, type
            },
            method: "POST",
            headers: {
                authorization: retrieveToken()
            }
        }).then(res=>{
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
            method: "POST",
            url: endpoints.wallet( as === 'contractor' ? 'c-transactions':"transactions", projectId, userId),
            data: {
                as,
                token: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: FETCH_MY_TRANSACTIONS_S, data: res.data });
        }).catch(res=>{
            dispatch({ type: FETCH_MY_TRANSACTIONS_F })
    })
    }
}

export const fetch_balances = () => {
    return dispatch => {
        dispatch({type: FETCH_MY_WALLET_R })
        Axios({
            url: endpoints.r_wallet("balance"),
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