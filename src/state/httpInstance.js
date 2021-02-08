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
        const token = cookies.getItem(TOKEN);
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export { httpInstance };
