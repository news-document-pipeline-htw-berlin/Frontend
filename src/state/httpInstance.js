import axios from 'axios';
import cookies from 'js-cookies';

import { PROXY } from './config';
import { TOKEN } from '../constants/CommonConstants';

const httpInstance = axios.create({
    baseURL: PROXY,
    withCredentials: true
});

httpInstance.interceptors.request.use(
    config => {
        const { origin } = new URL('http://localhost:3000');
        const allowedOrigins = ['http://localhost:3000'];
        const token = cookies.getItem(TOKEN);
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export { httpInstance };
