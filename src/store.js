import allReducers from "./global-state/reducers/rootReducer";
import { applyMiddleware, createStore } from "redux";
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import promiseMiddleware from "redux-promise";
/* LocalStorage Functions */
import { loadState } from "./global-state/LocalStorage";
import { saveState } from "./global-state/LocalStorage";

const persistedState = loadState();
const middleware = [thunk];
const store = createStore(
    allReducers,

    persistedState,
    composeWithDevTools(applyMiddleware(promiseMiddleware, ...middleware))
);

store.subscribe(() => {
    saveState({
        auth: store.getState().auth,
        selectedUser: store.getState().selectedUser,
    });
});


export default store;
