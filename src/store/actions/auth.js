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
    type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const logoutSucceed = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => ({
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
});

export const auth = (email, password, isSignUp) => ({
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignUp
});

export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
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
