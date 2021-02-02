import React, { useEffect, useState } from 'react';

import { httpInstance } from '../../state/httpInstance';
import Feedback from '../common/Feedback';
import { getAccessToken, removeAccessToken, getSuggest } from '../auth/JWT';
import { wording } from '../common/common';

/**
 * Updates keywords for current user.
 * @param {*} keywords
 */
export function updateKeywords(keywords) {
    const update = async () => {
        await httpInstance.put('/users/suggestions', { list: keywords });
    };
    if (getAccessToken()) {
        update();
        return true;
    }
    return false;
}

/**
 * Returns true if user has no keywords in database.
 */
export function useKeywords() {
    const [keywords, setKeywords] = useState(0);
    const get = async () => {
        await httpInstance.get('/users/keywords').then(res => {
            setKeywords(res.data);
        });
    };
    useEffect(() => {
        get();
    }, []);
    return [keywords === 0];
}
/**
 * Retrieves article suggestions for use if functionality is enabled.
 * @param {*} param0
 */
export function getSuggestions({
    setArticles,
    setAsync,
    setListMetaInformation
}) {
    const get = async () => {
        await httpInstance
            .get('/users/suggestions')
            .then(res => {
                if (res.data.resultCount > 0) {
                    setArticles(res.data.articles);
                    setListMetaInformation({
                        total: res.data.resultCount
                    });
                    setAsync({ isLoading: false, error: null });
                } else {
                    setAsync({ isLoading: true, error: null });
                }
            })
            .catch(err => setAsync({ isLoading: false, error: err }));
    };
    if (getAccessToken() && getSuggest()) {
        get();
    }
}

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
                        message={wording.user.success.profile}
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
                            message={wording.error}
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
                        message={wording.user.success.password}
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
                            message={wording.error}
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
                        message={wording.user.success.data}
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
                            message={wording.error}
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
                        message={wording.user.success.account}
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
                            message={wording.error}
                            setFeedback={setFeedback}
                        />
                    );
                }
            });
    };
    del();
}
