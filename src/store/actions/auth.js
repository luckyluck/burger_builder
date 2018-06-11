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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

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
                
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                const expirationTime = new Date().getTime() + response.data.expiresIn * 1000;
                localStorage.setItem('expirationTime', expirationTime);
                
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = localStorage.getItem('expirationTime');
            const currentTime = new Date().getTime();
            
            if (!expirationTime || expirationTime < currentTime) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationTime - currentTime) / 1000));
            }
        }
    };
};
