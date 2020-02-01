import { takeEvery, put, call } from 'redux-saga/effects';
import Service from '../service/Service';
import { LOAD_INIT_USERS_DATA, putInitData } from '../actions/userActions';

const service = new Service();

function fetchData() {
    return service.getAllUsers().then(data => data);
}

function* workerLoadData() {
    const data = yield call(fetchData);
    yield put(putInitData(data));
}

export default function* watchTestSaga() {
    yield takeEvery(LOAD_INIT_USERS_DATA, workerLoadData);
}