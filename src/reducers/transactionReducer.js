import { BATCH_TRANSACTIONS,FIELD_BATCH_TRANSACTIONS } from '../actions/types';

const initialState = {};

/*
  Transaction Reducer:
  set correct payload to the state of the container
*/
export default function(state = initialState, action ) {
    switch(action.type) {
        case BATCH_TRANSACTIONS:
            return action.payload;
        case FIELD_BATCH_TRANSACTIONS:
            return action.payload;
        default:
            return state;
    }
}
