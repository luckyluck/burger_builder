import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationTime');
    
    yield put({ type: actionTypes.AUTH_LOGOUT });
}
