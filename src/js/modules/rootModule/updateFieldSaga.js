import { takeEvery, call } from 'redux-saga/effects';
//import ActionTypes from '../../modules/constants/actionTypes.js';
import Service from "../service/Service";
import { UPDATE_FIELD } from '../actions/fieldsActions';

const service = new Service();

function fetchData(userData) {
    return service.settingUi(userData, 'setting')
}

function* workerLoadData(action) {
    yield call(fetchData, action.payload);
}

export default function* watchTestSaga() {
    yield takeEvery(UPDATE_FIELD, workerLoadData);
}