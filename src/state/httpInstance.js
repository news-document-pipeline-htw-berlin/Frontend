import axios from 'axios';
import cookies from 'js-cookies';

import { PROXY, LOCAL } from './config';
import { TOKEN } from '../constants/CommonConstants';

const httpInstance = axios.create({
    baseURL: PROXY,
    withCredentials: true
});

httpInstance.interceptors.request.use(
    config => {
        const { origin } = new URL(`${LOCAL}`);
        const allowedOrigins = [`${LOCAL}`];
        if (allowedOrigins.includes(origin) && cookies.hasItem(TOKEN)) {
            const token = cookies.getItem(TOKEN);
            config.headers.authorization = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export { httpInstance };
