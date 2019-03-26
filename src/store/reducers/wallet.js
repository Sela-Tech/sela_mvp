import * as wallet from "../actions/wallet";

const init = {
token:{
    balance: "",
    spent: "",
    transactions: []
},
perTransaction: []
}

export default ( state = init, payload ) => {
    switch (payload.type) {

        case wallet.CLEAR_WALLET:
        return init;
            
        case wallet.FETCH_MY_TRANSACTIONS_R:
            return {
                ...state,
                type: wallet.FETCH_MY_TRANSACTIONS_R
            }
        case wallet.FETCH_MY_TRANSACTIONS_S:
            return {
                ...state,
                type: wallet.FETCH_MY_TRANSACTIONS_S,
                ...payload.data
            }
            
        case wallet.FETCH_MY_TRANSACTIONS_F:
            return {
                ...state,
                type: wallet.FETCH_MY_TRANSACTIONS_F
            }
            
        case wallet.FETCH_MY_WALLET_R:
            return {
                ...state,
                type: wallet.FETCH_MY_WALLET_R
            };
    
            case wallet.FETCH_MY_WALLET_S:
            return {
                ...state,
                type: wallet.FETCH_MY_WALLET_S,
                createdTokens: payload.wallet.tokens.createdProjects,
                receivedTokens: payload.wallet.tokens.joinedProjects
            };
    
            case wallet.FETCH_MY_WALLET_F:
            return {
                ...state,
                type: wallet.FETCH_MY_WALLET_F
            };
    
        default:
            return state;
    }
}


/*
- all projects i create, have coins
- all projects i've joined to have coins, 
*/
