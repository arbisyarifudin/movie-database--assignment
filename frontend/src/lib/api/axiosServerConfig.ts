import axios from 'axios';
import { cookies } from 'next/headers';

const axiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
    baseURL: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://backend:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // get access token from cookie
        let token = null;
        const cookieStore = cookies();
        const accessToken = cookieStore.get('access_token');
        if (accessToken) {
            token = accessToken.value;
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
            console.error('Error response:', error.response.data);

            if (error.response.status === 401) {
                // redirect to login page
                const guestPages = ['/'];
                if (
                    typeof window !== 'undefined' &&
                    !guestPages.includes(window.location.pathname)
                ) {
                    window.location.replace('/');
                }
            }
        } else if (error.request) {
            // console.error('Error request:', error.request);
            console.error('Error request:', error.message);
        } else {
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
