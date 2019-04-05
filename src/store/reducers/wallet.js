import * as wallet from "../actions/wallet";

const init = {
    balances: [],
    projectAssetTransactions:{
        transactions: [],
        createdToken: {
            distributor: {
                distributionAccountBalances: []
            }
        }
    }
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
                ...payload.wallet
            };
    
            case wallet.FETCH_MY_WALLET_F:
            return {
                ...state,
                type: wallet.FETCH_MY_WALLET_F
            };
    
    case wallet.FETCH_PROJECT_ASSET_BALANCE_R:
        return {
            ...state,
            type: wallet.FETCH_PROJECT_ASSET_BALANCE_R,
            projectAssetBalance: payload.data
        }
        
    case wallet.FETCH_PROJECT_ASSET_BALANCE_S:
        return {
            ...state,
            type: wallet.FETCH_PROJECT_ASSET_BALANCE_S
        }
        
    case wallet.FETCH_PROJECT_ASSET_BALANCE_F:
        return {
            ...state,
            type: wallet.FETCH_PROJECT_ASSET_BALANCE_F
        };

        case wallet.FETCH_PROJECT_ASSET_TRANSACTIONS_R:
        return {
            ...state,
            type: wallet.FETCH_PROJECT_ASSET_TRANSACTIONS_R
        }

        case wallet.FETCH_PROJECT_ASSET_TRANSACTIONS_S:
        return {
            ...state,
            type: wallet.FETCH_PROJECT_ASSET_TRANSACTIONS_S,
            projectAssetTransactions: {...payload.data, transactions: payload.data.transactions.reverse()}
        };

        case wallet.FETCH_PROJECT_ASSET_TRANSACTIONS_F:
        return {
            ...state,
            type: wallet.FETCH_PROJECT_ASSET_TRANSACTIONS_F
        };

        case wallet.TRANSFER_ASSET_F:
        return {
            ...state, type: wallet.TRANSFER_ASSET_F
        }

        default:
            return state;
    }
}


/*
- all projects i create, have coins
- all projects i've joined to have coins, 
*/
