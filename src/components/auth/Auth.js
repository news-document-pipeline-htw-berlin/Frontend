import { getDarkMode, getAccessToken, removeAccessToken } from './JWT';
import { httpInstance } from '../../state/httpInstance';

/**
 * Attempts a login with given login request.
 * If successful, user will be redirected to the front page.
 * @param {*} param0
 */
export function login({
    loginRequest,
    setDarkState,
    error,
    setError,
    history
}) {
    const sendLoginRequest = async () => {
        await httpInstance
            .post('/users/login', loginRequest)
            .then(() => {
                // TODO: set snackbar to successful login
            })
            .catch(err => {
                if (err.response) {
                    setError({
                        ...error,
                        user: err.response.status === 404,
                        password: err.response.status === 401
                    });
                } else if (err.request) {
                    // TODO: set snackbar to server error
                }
            })
            .then(() => {
                if (getAccessToken() !== null) {
                    setDarkState(getDarkMode());
                    history.push('/');
                }
            });
    };
    sendLoginRequest();
}

/**
 * Attemps to create a new user.
 * If successful, the new user is logged in automatically.
 * @param {*} param0
 */
export function signup({ userData, setDarkState, error, setError, history }) {
    const sendSignupRequest = async () => {
        let ok = false;
        setError({
            ...error,
            user: false,
            email: false,
            passwordRep: false
        });
        await httpInstance
            .post('/users/signup', userData)
            .then(() => {
                ok = true;
                // TODO: set snackbar to successful signup
            })
            .catch(err => {
                if (err.response) {
                    setError({
                        ...error,
                        user: err.response.data.includes('Username'),
                        email: err.response.data.includes('Email'),
                        passwordRep: err.response.data.includes('Password')
                    });
                } else if (err.request) {
                    // TODO: set snackbar to server error
                }
            })
            .then(() => {
                if (ok) {
                    const loginRequest = {
                        user: userData.username,
                        password: userData.password,
                        rememberMe: userData.rememberMe
                    };
                    login({
                        loginRequest,
                        setDarkState,
                        error,
                        setError,
                        history
                    });
                }
            });
    };
    sendSignupRequest();
}

/**
 * Removes the access token and redirects the user to the front page.
 */
export function logout({ setDarkState, history }) {
    if (removeAccessToken()) {
        setDarkState(false);
        history.push('/');
        // TODO: set snackbar for successful logout
    }
}
