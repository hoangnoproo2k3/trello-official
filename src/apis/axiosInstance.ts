import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_ROOT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add any custom headers or modify the request config here
        // Example: config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle response errors here
        console.error('API call error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
