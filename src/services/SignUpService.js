import { httpInstance } from '../state/httpInstance';

function SignUpService(userData) {
    const signUp = async () => {
        let msg = 'Something went wrong. Please try again later.';
        let sev = 'warning';

        await httpInstance
            .post('/users/signup', userData)
            .then(response => {
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
        return { alert: true, message: msg, severity: sev };
    };
    return signUp();
}

export default SignUpService;
