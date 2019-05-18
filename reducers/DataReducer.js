import {
    CALC_INDEX,
    ROUND_UPDATE,
    ROUND_CREATE,
    ROUND_SAVE_SUCCESS,
    CLEAR_FORM,
    BULK_UPLOAD
} from '../actions/types';

const INITIAL_STATE = {
    score: '',
    course: '',
    date: '',
    slope: '',
    rating: '',
    diff: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CALC_INDEX:
            return { ...state, index: action.payload.value }
        case ROUND_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case ROUND_CREATE:
            return INITIAL_STATE;
        case ROUND_SAVE_SUCCESS:
            return INITIAL_STATE;
        case CLEAR_FORM:
            return INITIAL_STATE;
        case BULK_UPLOAD:
            return INITIAL_STATE;
        default:
            return state;
    }
};
