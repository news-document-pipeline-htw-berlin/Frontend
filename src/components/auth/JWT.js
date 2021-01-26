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
export function setDarkModeToken(value) {
    const token = getAccessToken();
    if (token === null) return;
    removeAccessToken();
    // TODO: inject secret
    const secret = 'secret';
    const data = token.expiresAt
        ? {
              user: token.user,
              id: token.id,
              darkMode: value,
              suggestions: token.suggestions,
              expiresAt: token.expiresAt
          }
        : {
              user: token.user,
              id: token.id,
              darkMode: value,
              suggestions: token.suggestions
          };
    cookies.setItem(TOKEN, sign(data, secret));
}

/**
 * Retrieves the dark mode claim from token.
 */
export function getDarkMode() {
    return getAccessToken() && getAccessToken().darkMode === true;
}

/**
 * Resets the current token with a switched suggestion claim.
 */
export function setSuggestToken(value) {
    const token = getAccessToken();
    if (token === null) return;
    removeAccessToken();
    // TODO: inject secret
    const secret = 'secret';
    const data = token.expiresAt
        ? {
              user: token.user,
              id: token.id,
              darkMode: token.darkMode,
              expiresAt: token.expiresAt,
              suggestions: value
          }
        : {
              user: token.user,
              id: token.id,
              darkMode: token.darkMode,
              suggestions: value
          };
    cookies.setItem(TOKEN, sign(data, secret));
}

/**
 * Retrieves the suggestions claim from token.
 */
export function getSuggest() {
    return getAccessToken() && getAccessToken().suggestions === true;
}
