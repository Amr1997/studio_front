import axiosInstance from "../components/api/axio";
export const login = (credentials) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('api/auth/jwt/create/', credentials);
        console.log(response.data)
        const accessToken = response.data.access
        console.log(accessToken)
        const refreshToken = response.data.refresh
        console.log(refreshToken)
        const user = response.data
        dispatch({ type: 'LOGIN_SUCCESS', payload: { accessToken, refreshToken, user } });
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', payload: error.message });
    }
};

export const logout = () => {
    return { type: 'LOGOUT' };
};
