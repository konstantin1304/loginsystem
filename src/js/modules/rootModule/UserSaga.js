import { takeEvery, call } from 'redux-saga/effects';
//import ActionTypes from '../../modules/constants/actionTypes.js';
import Service from "../service/Service";
import { SAVE_USERS_DATA } from '../actions/userActions';

const service = new Service();

function fetchData(userData) {
    return service.saveUser(userData, 'save').then(data => data);
}

function* workerLoadData(action) {
    yield call(fetchData, action.payload);
}

export default function* watchTestSaga() {
    yield takeEvery(SAVE_USERS_DATA, workerLoadData);
}