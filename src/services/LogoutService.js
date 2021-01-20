import cookies from 'js-cookies';
import { TOKEN, DARKMODE } from '../constants/CommonConstants';

function LogoutService() {
    const logout = () => {
        if (cookies.hasItem(TOKEN)) cookies.removeItem(TOKEN);
        if (cookies.hasItem(DARKMODE)) cookies.removeItem(DARKMODE);
    };

    return logout();
}

export default LogoutService;
