import {
    all,
    call,
} from 'redux-saga/effects';
import loadSaga from '../modules/rootModule/AllUsersSaga';
import saveSaga from '../modules/rootModule/UserSaga';
import initSaga from '../modules/rootModule/InitSaga';
import addFieldSaga from '../modules/rootModule/addFieldSaga';
import updateFieldSaga from '../modules/rootModule/updateFieldSaga';

const sagasList = [
    loadSaga,
    saveSaga,
    initSaga,
    addFieldSaga,
    updateFieldSaga,
];

export default function* watchRootSaga() {
    yield all(sagasList.map(saga => call(saga)));
}
