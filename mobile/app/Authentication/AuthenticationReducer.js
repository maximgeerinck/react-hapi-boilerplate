import * as types from "./AuthenticationActionTypes";
import Immutable from "immutable";
import { AUTH_TOKEN } from "./AuthenticationConstants";
import * as errorTypes from "../error/ErrorActionTypes";

export const AuthRecord = new Immutable.Record({
    isAuthenticated: false,
    token: null,
    form: Immutable.Map({
        isInvalid: false,
        isSubmitting: false,
        errors: {},
    }),
    error: undefined,
}, "AuthRecord");

const AuthenticationReducer = (state = new AuthRecord(), action) => {
    state = state.setIn(["form", "isSubmitting"], false).set("error", undefined);
    switch (action.type) {
        case types.AUTHENTICATE_SUCCESS:
            return state.set("isAuthenticated", true).set("token", action.body.token);
        case types.AUTHENTICATE_FAILURE:
            return state.setIn(["form", "isInvalid"], true);
        case types.AUTHENTICATE_REQUEST:
            return state.setIn(["form", "isSubmitting"], true);
        case types.LOGOUT:
            return state.set("isAuthenticated", false);
        case errorTypes.ERROR_KNOWN:
            return state.setIn(["form", "errors"], action.body);
        default:
            return state;
    }
};

export default AuthenticationReducer;
