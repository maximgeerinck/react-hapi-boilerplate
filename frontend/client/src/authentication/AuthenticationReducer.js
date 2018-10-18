import * as types from "./AuthenticationActionTypes";
import { LOCATION_CHANGE } from "react-router-redux";
import Immutable from "immutable";
import { AUTH_TOKEN } from "./AuthenticationConstants";
import * as errorTypes from "../error/ErrorActionTypes";

var InitialState = new Immutable.Record({
    isAuthenticated: localStorage.getItem(AUTH_TOKEN) ? true : false,
    token: localStorage.getItem(AUTH_TOKEN) || null,
    form: Immutable.Map({
        isInvalid: false,
        isSubmitting: false,
        errors: {},
    }),
    error: undefined,
});

const AuthenticationReducer = (state = new InitialState(), action) => {
    state = state.setIn(["form", "isSubmitting"], false).set("error", undefined);
    switch (action.type) {
        case types.AUTHENTICATE_SUCCESS:
            return state.set("isAuthenticated", true).set("token", action.body.token);
        case types.AUTHENTICATE_FAILURE:
            return state.setIn(["form", "isInvalid"], true);
        case types.AUTHENTICATE_REQUEST:
            return state.setIn(["form", "isSubmitting"], true);
        case LOCATION_CHANGE:
            return state.setIn(["form", "isInvalid"], false);
        case types.LOGOUT:
            localStorage.clear();
            return state.set("isAuthenticated", false);
        case errorTypes.ERROR_KNOWN:
            return state.setIn(["form", "errors"], action.body);
        default:
            return state;
    }
};

export default AuthenticationReducer;
