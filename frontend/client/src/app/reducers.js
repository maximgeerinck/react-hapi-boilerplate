import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import * as CacheHelper from "../helpers/CacheHelper";
import * as authTypes from "../authentication/AuthenticationActionTypes";

import auth from "../authentication/AuthenticationReducer";
import user from "../user/UserReducer";
import error from "../error/ErrorReducer";
import global from "../global/GlobalReducer";

const appReducer = combineReducers({
    auth,
    user,
    error,
    global,
    routing: routerReducer
});

const rootReducer = (state, action) => {
    if (action.type === authTypes.LOGOUT) {
        CacheHelper.clear();
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
