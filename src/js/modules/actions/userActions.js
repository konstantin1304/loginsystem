export const PUT_USERS_DATA = 'PUT_USERS_DATA';
export const LOAD_INIT_USERS_DATA = 'LOAD_INIT_USERS_DATA';
export const PUT_INIT_USERS_DATA = 'PUT_INIT_USERS_DATA';
export const LOAD_USERS_DATA = 'LOAD_USERS_DATA';
export const SET_CURRENT_USER_DATA = 'SET_CURRENT_USER_DATA';
export const REMOVE_CURRENT_USER_DATA = 'REMOVE_CURRENT_USER_DATA';
export const SET_VERSION = 'SET_VERSION';
export const SET_VERSION_DATA = 'SET_VERSION_DATA';
export const SET_PREV_DATA = 'SET_PREV_DATA';
export const SAVE_USERS_DATA = 'SAVE_USERS_DATA';


export const putInitData = data => {
    return {
        type: PUT_INIT_USERS_DATA,
        payload: data,
    };
};

export const putData = statement => {
    return {
        type: PUT_USERS_DATA,
        payload: statement,
    };
};

export const loadInitData = () => {
    return {
        type: LOAD_INIT_USERS_DATA,
    };
};

export const loadData = () => {
    return {
        type: LOAD_USERS_DATA,
    };
};

export const setCurrentUserData = (data) => {
    return {
        type: SET_CURRENT_USER_DATA,
        payload: data,
    };
};

export const removeCurrentUserData = () => {
    return {
        type: REMOVE_CURRENT_USER_DATA,
    };
};

export const saveData = (data) => {
    return {
        type: SAVE_USERS_DATA,
        payload: data,
    };
};

export const setVersion = (version) => {
    return {
        type: SET_VERSION,
        payload: version,
    };
};

export const setVersionData = (data) => {
    return {
        type: SET_VERSION_DATA,
        payload: data,
    };
};

export const setPrevData = (data) => {
    return {
        type: SET_PREV_DATA,
        payload: data,
    };
};

