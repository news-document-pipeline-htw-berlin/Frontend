import cookies from 'js-cookies';
import { TOKEN } from '../constants/CommonConstants';

function LogoutService() {
    const logout = () => {
        if (cookies.hasItem(TOKEN)) {
            cookies.removeItem(TOKEN);
        }
    };

    return logout();
}

export default LogoutService;
