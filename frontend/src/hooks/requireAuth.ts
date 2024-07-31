import useAuthStore from '../stores/authStore';

const useRequireAuth = (redirectQuickly = true) => {
    const initializeAuth = useAuthStore((state: any) => state.initializeAuth);
    initializeAuth();

    const user = useAuthStore((state: any) => state.user);
    if (!user) {
        if (redirectQuickly) {
            window.location.replace('/')
        }
        return false
    }
    return true;
};

export default useRequireAuth;
