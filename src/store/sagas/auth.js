import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'userId');
    yield call([localStorage, 'removeItem'], 'expirationTime');
    
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
        yield call([localStorage, 'setItem'], 'token', response.data.idToken);
        yield call([localStorage, 'setItem'], 'userId', response.data.localId);
        yield call([localStorage, 'setItem'], 'expirationTime', expirationTime);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error));
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');

    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationTime = yield localStorage.getItem('expirationTime');
        const currentTime = yield new Date().getTime();

        if (!expirationTime || expirationTime < currentTime) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');

            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationTime - currentTime) / 1000));
        }
    }
}
