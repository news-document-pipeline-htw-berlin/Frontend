import React from 'react';
import cookies from 'js-cookies';
import { httpInstance } from '../../state/httpInstance';
import { TOKEN } from '../../constants/CommonConstants';
import Feedback from '../common/Feedback';
import { removeAccessToken } from '../auth/JWT';

/**
 * Sends a request to update user data.
 * @param {*} userData
 * @param {*} setFeedback
 */
export function updateUserData(userData, setFeedback) {
    const update = async () => {
        await httpInstance
            .put('/users/account', userData)
            .then(response => {
                setFeedback(
                    <Feedback
                        severity="success"
                        message="Profile has been updated."
                        setFeedback={setFeedback}
                    />
                );
            })
            .catch(error => {
                if (error.response) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={error.response.data}
                            setFeedback={setFeedback}
                        />
                    );
                } else if (error.request) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message="There was an internal server error."
                            setFeedback={setFeedback}
                        />
                    );
                }
            });
    };
    update();
}

/**
 * Sends a request to change the password.
 * @param {*} password
 * @param {*} setFeedback
 */
export function changePassword(password, setFeedback) {
    const change = async () => {
        await httpInstance
            .put('/users/account', password)
            .then(response => {
                setFeedback(
                    <Feedback
                        severity="success"
                        message="Password has been changed."
                        setFeedback={setFeedback}
                    />
                );
            })
            .catch(error => {
                if (error.response) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={error.response.data}
                            setFeedback={setFeedback}
                        />
                    );
                } else if (error.request) {
                    setFeedback(
                        <Feedback
                            severity="success"
                            message="There was an internal server error."
                            setFeedback={setFeedback}
                        />
                    );
                }
            });
    };
    change();
}

/**
 * Sends a request to delete user data.
 * @param {*} authRequest
 * @param {*} setFeedback
 */
export function deleteData(authRequest, setFeedback) {
    const del = async () => {
        await httpInstance
            .delete('/users/account?data=true', { data: authRequest })
            .then(response => {
                setFeedback(
                    <Feedback
                        severity="success"
                        message="Data has been deleted."
                        setFeedback={setFeedback}
                    />
                );
            })
            .catch(error => {
                if (error.response) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={error.response.data}
                            setFeedback={setFeedback}
                        />
                    );
                } else if (error.request) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message="There was an internal server error."
                            setFeedback={setFeedback}
                        />
                    );
                }
            });
    };
    return del();
}

/**
 * Sends a request to delete user's account.
 * @param {*} authRequest
 * @param {*} setFeedback
 * @param {*} history
 */
export function deleteAccount(authRequest, setFeedback, history) {
    const del = async () => {
        await httpInstance
            .delete('/users/account?account=true', { data: authRequest })
            .then(response => {
                setFeedback(
                    <Feedback
                        severity="success"
                        message="Account has been deleted."
                        setFeedback={setFeedback}
                    />
                );
                removeAccessToken();
                history.push('/');
            })
            .catch(error => {
                if (error.response) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message={error.response.data}
                            setFeedback={setFeedback}
                        />
                    );
                } else if (error.request) {
                    setFeedback(
                        <Feedback
                            severity="error"
                            message="There was an internal server error."
                            setFeedback={setFeedback}
                        />
                    );
                }
            });
    };
    del();
}
