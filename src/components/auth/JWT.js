import cookies from 'js-cookies';
import jwt from 'jwt-decode';
import sign from 'jwt-encode';

import { TOKEN } from '../../constants/CommonConstants';

/**
 * Retrieves the decoded access token.
 */
export function getAccessToken() {
    if (cookies.hasItem(TOKEN)) return jwt(cookies.getItem(TOKEN));
    return null;
}

/**
 * Removes the access token.
 */
export function removeAccessToken() {
    if (cookies.hasItem(TOKEN)) {
        cookies.removeItem(TOKEN);
        return true;
    }
    return false;
}

/**
 * Resets the current token with a switched dark mode.
 */
export function setDarkModeToken() {
    const token = getAccessToken();
    if (token === null) return;
    removeAccessToken();
    // TODO: inject secret
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
              darkMode: !token.darkMode
          };
    cookies.setItem(TOKEN, sign(data, secret));
}

/**
 * Retrieves the dark mode claim from token.
 */
export function getDarkMode() {
    return getAccessToken() && getAccessToken().darkMode === true;
}
