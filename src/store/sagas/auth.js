import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationTime');
    
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDcDjx3Z4RxW1sC0ciDzmMefp_o5wA-RzY';
    if (!action.isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDcDjx3Z4RxW1sC0ciDzmMefp_o5wA-RzY';
    }
    
    try {
        const response = yield axios.post(url, {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        });
    
        const expirationTime = yield new Date().getTime() + response.data.expiresIn * 1000;
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        yield localStorage.setItem('expirationTime', expirationTime);
    
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error));
    }
}
