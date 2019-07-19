import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import transferReducer from './transferReducer';
import transactionReducer from './transactionReducer'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    transfer:transferReducer,
    transactions:transactionReducer
});
