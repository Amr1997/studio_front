import axiosInstance from "../components/api/axio";
const tokenMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
    if (action.type === 'LOGIN_SUCCESS') {
        try {
            const { accessToken } = action.payload;
            console.log(accessToken)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            localStorage.setItem('accessToken', accessToken);
        } catch (error) {
            console.error('Error setting access token:', error);
        }
    } else if (action.type === 'LOGOUT') {
        try {
            delete axiosInstance.defaults.headers.common['Authorization'];
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error('Error removing access token:', error);
        }
    }

    return next(action);
};

export default tokenMiddleware;
