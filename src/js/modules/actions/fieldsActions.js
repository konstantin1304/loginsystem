export const ADD_NEW_FIELD = 'ADD_NEW_FIELD';
export const UPDATE_FIELD = 'UPDATE_FIELD';

export const addNewField = (data) => {
    return {
        type: ADD_NEW_FIELD,
        payload: data,
    };
};

export const updateField = (data) => {
    return {
        type: UPDATE_FIELD,
        payload: data,
    };
};