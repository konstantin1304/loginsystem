import { combineReducers } from 'redux';
import userReducer from '../modules/reducers/userReducer.js';
import fieldReducer from '../modules/reducers/fieldReducer.js';

const rootReducer = combineReducers({
    user: userReducer,
    field: fieldReducer,
});

export default rootReducer;
