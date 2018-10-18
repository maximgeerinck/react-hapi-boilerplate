import * as types from "./ProfileActionTypes";
import { buildGetRequest, buildPostRequest, buildPutRequest } from "../app/api";

const profilesReceived = items => ({ type: types.PROFILES_SUCCESS, body: items });
const profilesFailure = err => ({ type: types.PROFILES_FAILURE, body: err });
const profilesRequest = () => ({ type: types.PROFILES_REQUEST });

const profileCreateSuccess = items => ({ type: types.PROFILE_CREATE_SUCCESS, body: items });
const profileCreateFailure = err => ({ type: types.PROFILE_CREATE_FAILURE, body: err });
const profileCreateRequest = () => ({ type: types.PROFILE_CREATE_REQUEST });

const profileSaveSuccess = items => ({ type: types.PROFILE_SAVE_SUCCESS, body: items });
const profileSaveFailure = err => ({ type: types.PROFILE_SAVE_FAILURE, body: err });
const profileSaveRequest = () => ({ type: types.PROFILE_SAVE_REQUEST });
const profileCreationValidationFailed = v => ({ type: types.PROFILE_CREATE_FAILURE_VALIDATION, body: v });

const imageUploadRequest = () => ({ type: types.IMAGE_UPLOAD_REQUEST });
const imageUploadSuccess = (type, image) => ({ type: types.IMAGE_UPLOAD_SUCCESS, body: { type, image } });
const imageUploadFailure = () => ({ type: types.IMAGE_UPLOAD_FAILURE });

const loadProfileSuccess = items => ({ type: types.LOAD_PROFILE_SUCCESS, body: items });
const loadProfileFailure = err => ({ type: types.LOAD_PROFILE_FAILURE, body: err });
const loadProfileRequest = () => ({ type: types.LOAD_PROFILE_REQUEST });

export const index = () => {
    return async (dispatch, getState) => {
        dispatch(profilesRequest());
        try {
            const profiles = await buildGetRequest("profiles").auth(getState().auth.token).send()
            dispatch(profilesReceived(profiles));
        } catch (ex) {
            dispatch(profilesFailure());
        }
    }
}

export const save = (profile) => {
    return async (dispatch, getState) => {
        try {
            dispatch(profile.id ? profileSaveRequest() : profileCreateRequest());
            const returnedProfile = await buildPostRequest("profile").auth(getState().auth.token).send(profile)
            dispatch(profile.id ? profileSaveSuccess(returnedProfile) : profileCreateSuccess(returnedProfile));
            this.props.history.push("/");
        } catch (ex) {
            dispatch(profileCreationValidationFailed(ex));
            // dispatch(profile.id ? profileSaveFailure() : profileCreateFailure());
        }
    }
}

export const uploadIcon = (type, image) => {
    return (dispatch, getState) => {
        dispatch(imageUploadRequest());

        return buildPutRequest("profile/image").auth(getState().auth.token).request
            .attach("icon", image)
            .then((res) => {
                dispatch(imageUploadSuccess(type, res.body.image));
                return res.body.image;
            });
    };
};

export const load = (profileId) => {
    return async (dispatch, getState) => {
        dispatch(loadProfileRequest());
        try {
            const profile = await buildGetRequest(`profile/${profileId}`).auth(getState().auth.token).send()
            dispatch(loadProfileSuccess(profile));
            return profile;
        } catch (ex) {
            dispatch(loadProfileFailure());
        }
    }
}