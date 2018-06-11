import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
});

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDcDjx3Z4RxW1sC0ciDzmMefp_o5wA-RzY';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDcDjx3Z4RxW1sC0ciDzmMefp_o5wA-RzY';
        }
        dispatch(authStart());
        axios.post(url, {
            email,
            password,
            returnSecureToken: true
        })
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    };
};

export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDICRECT_PATH,
    path
});
