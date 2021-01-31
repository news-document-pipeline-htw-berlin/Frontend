import React from 'react';
import { getDarkMode, getAccessToken, removeAccessToken } from './JWT';
import { httpInstance } from '../../state/httpInstance';
import Feedback from '../common/Feedback';
import { wording } from '../common/common';

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
    history,
    setFeedback
}) {
    const sendLoginRequest = async () => {
        setError({
            ...error,
            user: false,
            password: false
        });
        await httpInstance
            .post('/users/login', loginRequest)
            .then(() => {
                setFeedback(
                    <Feedback
                        severity="success"
                        message={wording.auth.success.login}
                        setFeedback={setFeedback}
                    />
                );
            })
            .catch(err => {
                if (err.response) {
                    setError({
                        ...error,
                        user: err.response.status === 404,
                        password: err.response.status === 401
                    });
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={err.response.data}
                            setFeedback={setFeedback}
                        />
                    );
                } else if (err.request) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={wording.error}
                            setFeedback={setFeedback}
                        />
                    );
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
export function signup({
    userData,
    setDarkState,
    error,
    setError,
    history,
    setFeedback
}) {
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
                setFeedback(
                    <Feedback
                        severity="success"
                        message={wording.auth.success.signup}
                        setFeedback={setFeedback}
                    />
                );
            })
            .catch(err => {
                if (err.response) {
                    setError({
                        ...error,
                        user: err.response.data.includes('Username'),
                        email: err.response.data.includes('Email'),
                        passwordRep: err.response.data.includes('Password')
                    });
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={err.response.data}
                            setFeedback={setFeedback}
                        />
                    );
                } else if (err.request) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={wording.error}
                            setFeedback={setFeedback}
                        />
                    );
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
    }
}
