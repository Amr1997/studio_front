/* eslint-disable import/no-anonymous-default-export */
import {LOGIN, LOGOUT} from "../actions/actionTypes";

const initialState = {
    isAuth: false,
    user: {},
    accessToken: "",
};

export default function (state = initialState, action) {
    //  (action.payload);
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
            };
        case LOGOUT:
            return { ...state, isAuth: false, user: {} };

        default:
            return state;
    }
}
