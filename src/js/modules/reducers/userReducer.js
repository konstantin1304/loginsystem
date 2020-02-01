import * as Actions from '../actions/userActions';

const initialState = {
    usersData: [],
    currentUserData: {},
    initData: [],
    version: 'version1',
    versionData: [],
    prevData: [],
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.PUT_INIT_USERS_DATA:
            return { ...state,
                initData: action.payload };
        case Actions.PUT_USERS_DATA:
            return { ...state,
            usersData: action.payload };
        case Actions.SET_CURRENT_USER_DATA:
            return { ...state,
                currentUserData: action.payload };
        case Actions.SET_VERSION:
            return { ...state,
                version: action.payload };
        case Actions.SET_VERSION_DATA:
            return { ...state,
                versionData: action.payload };
        case Actions.SET_PREV_DATA:
            return { ...state,
                prevData: action.payload };
        case Actions.REMOVE_CURRENT_USER_DATA:
            return { ...state,
                currentUserData: {} };
        default:
            return state;
    }
};

export default userReducer;