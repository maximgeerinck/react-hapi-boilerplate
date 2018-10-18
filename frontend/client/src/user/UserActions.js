import * as types from "./UserActionTypes";
import * as api from "../app/api";
import * as ErrorHelper from "../helpers/ErrorHelper";
import * as ErrorActions from "../error/ErrorActions";

const userSuccess = user => ({ type: types.USER_SUCCESS, body: user });
const userRequest = () => ({ type: types.USER_REQUEST });
const userFailed = () => ({ type: types.USER_FAILURE });

const creationSucceeded = user => ({ type: types.CREATION_SUCCESS, body: user });
const creationFailedValidation = errors => ({
    type: types.CREATION_FAILED_VALIDATION,
    body: errors,
});
const creationRequest = () => ({ type: types.CREATION_REQUEST });

const updateSucceeded = user => ({ type: types.UPDATE_SUCCESS, body: user });
const requestPasswordRequest = () => ({ type: types.REQUEST_PASSWORD_REQUEST });

const changePasswordSuccess = () => ({ type: types.USER_CHANGE_PASSWORD_SUCCESS });
const changePasswordFailure = err => ({ type: types.USER_CHANGE_PASSWORD_FAILURE, body: err });
const changePasswordRequest = () => ({ type: types.USER_CHANGE_PASSWORD_REQUEST });


export const changePassword = (currentPassword, newPassword) => {
    return (dispatch, getState) => {
        dispatch(changePasswordRequest());
        return api
            .buildPostRequest("user/password")
            .auth(getState().auth.token)
            .send({ currentPassword, newPassword })
            .then(response => {
                dispatch(changePasswordSuccess());
            })
            .catch(err => {
                dispatch(changePasswordFailure(err));
            });
    };
};

export const me = () => {
    return (dispatch, getState) => {
        dispatch(userRequest());

        return api
            .buildGetRequest("user/me")
            .auth(getState().auth.token)
            .onTimeout(() => {
                // dispatch(ErrorActions.timeout("Could not load user"));
            }, 60 * 1000)
            .send()
            .then(user => {
                dispatch(userSuccess(user));
            })
            .catch(err => {
                dispatch(userFailed());
            });
    };
};

export const create = user => {
    return dispatch => {
        dispatch(creationRequest());

        setTimeout(() => {
            return api
                .buildPostRequest("user/create")
                .send(user)
                .then(user => {
                    dispatch(creationSucceeded(user));
                })
                .catch(err => {
                    dispatch(creationFailedValidation(err));
                });
        }, 500);
    };
};

export const updateUser = user => {
    return (dispatch, getState) => {
        return api
            .buildPostRequest("user/update")
            .auth(getState().auth.token)
            .send({ user })
            .then(user => {
                dispatch(updateSucceeded(user));
            })
            .catch((err, obj) => {
                dispatch(ErrorHelper.handle(err));
            });
    };
};

export const requestPassword = email => {
    return dispatch => {
        dispatch(requestPasswordRequest());

        return api.buildPostRequest("forgot").send({ email });
    };
};

export const resetPassword = (token, email, password) => {
    return dispatch => {
        return api.buildPostRequest("reset").send({ email, token, password });
    };
};
