import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // get access token from cookie
        let token = null;
        if (typeof document !== 'undefined') {
            // token = document.cookie
            //     .split('; ')
            //     .find((row) => row.startsWith('access_token='))
            //     ?.split('=')[1];
            token = Cookies.get('access_token')
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            console.error('Error response:', error.response);

            if (error.response.status === 401) {
                // redirect to login page
                const guestPages = ['/'];
                if (
                    typeof window !== 'undefined' &&
                    !guestPages.includes(window.location.pathname)
                ) {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('access_token');
                    }
                    document.cookie =
                        'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    window.location.href = '/';
                }
            }
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
