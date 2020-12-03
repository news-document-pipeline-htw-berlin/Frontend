import { httpInstance } from '../state/httpInstance';

function UpdateUserData(userData) {
    const updateUserData = async () => {
        let al = true;
        let msg = 'Something went wrong. Please try again later.';
        let sev = 'warning';
        await httpInstance
            .put('/users', userData)
            .then(response => {
                al = false;
                msg = response.data;
                sev = 'success';
            })
            .catch(error => {
                if (error.response) {
                    msg = error.response.data;
                    sev = 'error';
                } else if (error.request) {
                    msg = 'Unable to reach server. Please try again later.';
                    sev = 'warning';
                }
            });
        return { alert: al, message: msg, severity: sev };
    };
    return updateUserData();
}

export { UpdateUserData };
