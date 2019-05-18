import {
    ROUNDS_FETCH_SUCCESS,
    CALC_INDEX
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ROUNDS_FETCH_SUCCESS:
            return action.payload;
        case CALC_INDEX:
            return action.payload.index;
        default:
            return state;
    }
};