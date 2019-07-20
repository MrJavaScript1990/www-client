import axios from 'axios';
import {BATCH_TRANSACTIONS,FIELD_BATCH_TRANSACTIONS} from './types';

/*
  Transaction Function
*/


/*
  Call the Api for retrieve the data
*/

export const transactionRequest = (transactionData) => dispatch => {
    axios.post('/api/jobs/transactions', transactionData)
        .then(res => {
            dispatch({
                type: BATCH_TRANSACTIONS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: FIELD_BATCH_TRANSACTIONS,
                payload: {errText:'Error retrieving data, server is not running or you do not have the permission to access'}
            });
        });
};
