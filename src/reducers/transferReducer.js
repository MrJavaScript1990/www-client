import { VALID_TRANSACTION,INVALID_TRANSACTION } from '../actions/types';

/*
  Transfer Reducer:
  set correct payload to the state of the container
*/

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case VALID_TRANSACTION:
            return action.payload;
        case INVALID_TRANSACTION:
            return action.payload;
        default:
            return state;
    }
}
