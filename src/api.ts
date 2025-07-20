import axios from 'axios';

const OAUTH2_TOKEN_URL = "/o/token/"
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

// Request interceptor to add Authorization header
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export { api, OAUTH2_TOKEN_URL, CLIENT_ID, CLIENT_SECRET }; 