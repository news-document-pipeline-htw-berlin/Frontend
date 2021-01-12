import cookies from 'js-cookies';
import { TOKEN } from '../constants/CommonConstants';

function LogoutService() {
    const logout = () => {
        cookies.removeItem(TOKEN);
    };

    return logout();
}

export default LogoutService;
