import * as types from "./UserActionTypes";
import * as profileTypes from "./ProfileActionTypes";
import { LOGOUT } from "../authentication/AuthenticationActionTypes";
import { Record, Map, List } from "immutable";
import * as errorTypes from "../error/ErrorActionTypes";
import { LOCATION_CHANGE } from "react-router-redux";
import * as CacheHelper from "../helpers/CacheHelper";

export const USER = "auth_user";

var InitialState = new Record({
    user: new Map({
        email: null,
    }),
    retrievedOn: null,
    isLoaded: false,
    form: Map({
        validationErrors: null,
        isSubmitting: false,
        succeeded: false,
        errors: {},
    }),
    profiles: new Map({
        loaded: false,
        items: new List(),
        validation: undefined
    }),
    currentProfile: new Map({
        icon_company: undefined,
        icon_profile: undefined
    })
});

let initialState = new InitialState();

// restore user

if (CacheHelper.getCache(USER)) {
    initialState = initialState
        .set("user", new Map(CacheHelper.getCache(USER)))
        .set("isLoaded", true);
}

const UserReducer = (state = initialState, action) => {
    state = state.setIn(["form", "isSubmitting"], false);

    switch (action.type) {
        case types.CREATION_REQUEST:
        case types.USER_CHANGE_PASSWORD_REQUEST:
            return state.setIn(["form", "isSubmitting"], true);

        case types.CREATION_SUCCESS:
        case types.USER_CHANGE_PASSWORD_SUCCESS:
            return state.setIn(["form", "isSubmitting"], false).setIn(["form", "succeeded"], true);

        case types.USER_SUCCESS:
            CacheHelper.cache(USER, action.body);
            return state
                .set("user", new Map(action.body))
                .set("isLoaded", true)
                .set("retrievedOn", Date.now());
        case types.CREATION_FAILED_VALIDATION:
            return state.setIn(["form", "validationErrors"], action.body);

        case types.UPDATE_SUCCESS:
            CacheHelper.cache(USER, action.body);
            return state.set("user", new Map(action.body));

        case types.USER_CHANGE_PASSWORD_FAILURE:
            return state.setIn(["form", "validationErrors"], action.body);
        case errorTypes.ERROR_KNOWN:
            return state.setIn(["form", "errors"], action.body);

        case profileTypes.PROFILES_SUCCESS:
            return state.setIn(["profiles", "items"], new List(action.body)).setIn(["profiles", "loaded"], true)

        case profileTypes.PROFILE_CREATE_FAILURE_VALIDATION:
            return state.setIn(["profiles", "validation"], action.body);

        case profileTypes.PROFILE_CREATE_SUCCESS:
            return state.setIn(["profiles", "loaded"], false);

        case profileTypes.IMAGE_UPLOAD_SUCCESS:
            return state.setIn(["currentProfile", action.body.type], action.body.image.thumbnail);

        case profileTypes.LOAD_PROFILE_SUCCESS:
            return state.set("currentProfile", new Map(action.body));

        case profileTypes.LOAD_PROFILE_REQUEST:
            return state.set("currentProfile", new Map({}))

        case LOGOUT:
            CacheHelper.clear();
            return state.set("user", new Map(null)).set("isLoaded", false);

        case LOCATION_CHANGE:
            return state
                .setIn(["form", "errors"], {})
                .setIn(["form", "isSubmitting"], false)
                .setIn(["form", "validationErrors"], null)
                .setIn(["form", "succeeded"], false);

        default:
            return state;
    }
};

export default UserReducer;
