import { httpInstance } from '../state/httpInstance';

function LoginService(loginRequest, setDarkState) {
    const login = async () => {
        let msg = 'Something went wrong. Please try again later.';
        let sev = 'warning';

        await httpInstance
            .post('/users/login', loginRequest)
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
    return login();
}

export default LoginService;
