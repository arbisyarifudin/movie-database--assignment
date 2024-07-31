import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    logout: () => {
        set({ user: null, token: null });
        Cookies.remove('access_token');
        localStorage.removeItem('user');
    },
    initializeAuth: () => {
        const user = JSON.parse(localStorage.getItem('user') ?? '');
        const token = Cookies.get('access_token');
        if (user && token) {
            set({ user, token });
        }
    },
}));

export default useAuthStore;
