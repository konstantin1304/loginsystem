import { takeEvery, call } from 'redux-saga/effects';
//import ActionTypes from '../../modules/constants/actionTypes.js';
import Service from "../service/Service";
import { ADD_NEW_FIELD } from '../actions/fieldsActions';

const service = new Service();

function fetchData(userData) {
    return service.saveUser(userData, 'setting')
}

function* workerLoadData(action) {
    yield call(fetchData, action.payload);
}

export default function* watchTestSaga() {
    yield takeEvery(ADD_NEW_FIELD, workerLoadData);
}