import cookies from 'js-cookies';
import { httpInstance } from '../state/httpInstance';
import { TOKEN } from '../constants/CommonConstants';

export function UpdateUserData(userData, customAlert, setCustomAlert) {
    const updateUserData = async () => {
        await httpInstance
            .put('/users/account', userData)
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

export function ChangePassword(password, customAlert, setCustomAlert) {
    const changePassword = async () => {
        await httpInstance
            .put('/users/account', password)
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
    return changePassword();
}

export function DeleteData(authRequest, setCustomAlert) {
    const deleteData = async () => {
        await httpInstance
            .delete('/users/account?data=true', { data: authRequest })
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

export function DeleteAccount(authRequest, setCustomAlert, history) {
    const deleteAccount = async () => {
        await httpInstance
            .delete('/users/account?account=true', { data: authRequest })
            .then(response => {
                setCustomAlert({ message: response.data, severity: 'success' });
                cookies.removeItem(TOKEN);
                history.push('/');
            })
            .catch(error => {
                alert(JSON.stringify(authRequest));
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
