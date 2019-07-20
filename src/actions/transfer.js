import axios from 'axios';
import {GET_ERRORS, INVALID_TRANSACTION, REMOVE_ERRORS, VALID_TRANSACTION} from './types';

/*
  Transfer Function :
  if its Successful it will return 200 and a refrence to the transaction or
  if its a Rejected transaction it will return a 400 and Error Object
*/

export const newTransfer = (transferData, history) => dispatch => {
    axios.post('/api/jobs/addjob', transferData)
            .then(res => {
                dispatch({
                    type: VALID_TRANSACTION,
                    payload: {message:'Transaction completed successfully', ref : res.data.refNumber }
                });
                dispatch({
                    type: REMOVE_ERRORS,
                    payload: {}
                });
            })//history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
                dispatch({
                    type: INVALID_TRANSACTION,
                    payload: {}
                });
            });
}

