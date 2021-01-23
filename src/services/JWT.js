import cookies from 'js-cookies';
import jwt from 'jwt-decode';
import sign from 'jwt-encode';
import { TOKEN } from '../constants/CommonConstants';

export function getAccessToken() {
    if (cookies.getItem(TOKEN)) return jwt(cookies.getItem(TOKEN));
    return null;
}

export function removeAccessToken() {
    if (cookies.getItem(TOKEN)) cookies.removeItem(TOKEN);
}

export function setDarkModeToken() {
    const token = getAccessToken();
    if (token === null) return;
    const secret = 'secret';
    const data = token.expiresAt
        ? {
              user: token.user,
              id: token.id,
              darkMode: !token.darkMode,
              expiresAt: token.expiresAt
          }
        : {
              user: token.user,
              id: token.id,
              darkMode: token.darkMode
          };

    cookies.setItem(TOKEN, sign(data, secret));
}

export function getDarkMode() {
    return getAccessToken() && getAccessToken().darkMode;
}
