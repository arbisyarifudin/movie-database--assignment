import axiosInstance from './axiosConfig';

export const login = async (data: { email: string; password: string, rememberMe?: boolean }) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        // console.log('Success login ', response);
        return response;
    } catch (error: any) {
        // console.error('Error login:', error.response);
        return error.response;
    }
};

export const getMe = async () => {
    try {
        const response = await axiosInstance.get('/auth/me');
        // console.log('Success get me', response.data);
        return response;
    } catch (error: any) {
    // console.error('Error getting me:', error.response);
        return error.response;
    }
};
