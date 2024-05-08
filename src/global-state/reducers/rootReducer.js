import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tokenReducer from "./tokenReducer";
import stateReducer from "./stateReducer";

const allReducers = combineReducers({
    auth: authReducer,
    accessToken: tokenReducer,
    selectedState: stateReducer,
});

export default allReducers;
