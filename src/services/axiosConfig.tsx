
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_ROOT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Xử lý dữ liệu phản hồi trước khi trả về
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;
