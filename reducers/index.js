import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DataReducer from './DataReducer';
import RoundsReducer from './RoundsReducer';

export default combineReducers({
    auth: AuthReducer,
    roundForm: DataReducer,
    rounds: RoundsReducer
});
