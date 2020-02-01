import { takeEvery, put, call } from 'redux-saga/effects';
//import ActionTypes from '../../modules/constants/actionTypes.js';
import Service from "../service/Service";
import { LOAD_USERS_DATA, putData } from "../actions/userActions";

const service = new Service();

function fetchData() {
    return service.getAllUsers().then(data => data);
}

function* workerLoadData() {
    const data = yield call(fetchData);
    yield put(putData(data));
}

export default function* watchTestSaga() {
    yield takeEvery(LOAD_USERS_DATA, workerLoadData);
}