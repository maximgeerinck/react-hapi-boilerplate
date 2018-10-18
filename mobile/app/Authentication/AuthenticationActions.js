import * as types from "./AuthenticationActionTypes";
import * as api from "../app/api";
import { AUTH_TOKEN } from "./AuthenticationConstants";
import * as ErrorHelper from "../helpers/ErrorHelper";

const authenticationSucceeded = user => ({ type: types.AUTHENTICATE_SUCCESS, body: user });
const authenticationRequest = () => ({ type: types.AUTHENTICATE_REQUEST });
const authenticationFailed = () => ({ type: types.AUTHENTICATE_FAILURE });

const logoutRequest = () => ({ type: types.LOGOUT });

export const logout = () => {
    return dispatch => {
        dispatch(logoutRequest());
    };
};

export const authenticate = (email, password) => {
    return dispatch => {
        dispatch(authenticationRequest());

        setTimeout(() => {
            return api
                .buildPostRequest("authenticate")
                .send({ email: email, password: password })
                .then(user => {
                    dispatch(authenticationSucceeded(user));
                    localStorage.setItem(AUTH_TOKEN, user.token);
                })
                .catch(err => {
                    if (err && err.message === "E_INVALID_CREDENTIALS") {
                        dispatch(authenticationFailed());
                    } else {
                        dispatch(ErrorHelper.handle(err));
                    }
                });
        }, 500);
    };
};
