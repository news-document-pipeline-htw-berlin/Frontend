import { httpInstance } from '../state/httpInstance';

export function UpdateUserData(userData, customAlert, setCustomAlert) {
    const updateUserData = async () => {
        await httpInstance
            .put('/users', userData)
            .then(response => {
                setCustomAlert({ message: response.data, severity: 'success' });
            })
            .catch(error => {
                if (error.response) {
                    setCustomAlert({
                        message: error.response.data,
                        severity: 'error'
                    });
                } else if (error.request) {
                    setCustomAlert({
                        message:
                            'Unable to reach server. Please try again later.',
                        severity: 'warning'
                    });
                }
            });
    };
    return updateUserData();
}

export function ChangePassword(
    userData,
    setUserData,
    password,
    customAlert,
    setCustomAlert
) {
    const changePassword = async () => {
        await httpInstance
            .put('/users', password)
            .then(response => {
                setUserData({ ...userData, password: password.newPassword });
                setCustomAlert({ message: response.data, severity: 'success' });
            })
            .catch(error => {
                if (error.response) {
                    setCustomAlert({
                        message: error.response.data,
                        severity: 'error'
                    });
                } else if (error.request) {
                    setCustomAlert({
                        message:
                            'Unable to reach server. Please try again later.',
                        severity: 'warning'
                    });
                }
            });
    };
    return changePassword();
}

export function DeleteData(password, setCustomAlert) {
    const deleteData = async () => {
        await httpInstance
            .delete('/users/data', password)
            .then(response => {
                setCustomAlert({ message: response.data, severity: 'success' });
            })
            .catch(error => {
                if (error.response) {
                    setCustomAlert({
                        message: error.response.data,
                        severity: 'error'
                    });
                } else if (error.request) {
                    setCustomAlert({
                        message:
                            'Unable to reach server. Please try again later.',
                        severity: 'warning'
                    });
                }
            });
    };
    return deleteData();
}

export function DeleteAccount(password, setCustomAlert) {
    const deleteAccount = async () => {
        await httpInstance
            .delete('/users/account', password)
            .then(response => {
                setCustomAlert({ message: response.data, severity: 'success' });
            })
            .catch(error => {
                if (error.response) {
                    setCustomAlert({
                        message: error.response.data,
                        severity: 'error'
                    });
                } else if (error.request) {
                    setCustomAlert({
                        message:
                            'Unable to reach server. Please try again later.',
                        severity: 'warning'
                    });
                }
            });
    };
    return deleteAccount();
}
