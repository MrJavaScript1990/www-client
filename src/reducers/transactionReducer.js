import { BATCH_TRANSACTIONS,FIELD_BATCH_TRANSACTIONS } from '../actions/types';

const initialState = {};

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
