const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                user: action.payload.user,
                isAuthenticated: true,
                error: null,
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
