import { combineReducers } from "redux";

import auth, { AuthRecord } from "./Authentication/AuthenticationReducer";
// import user from "./User/UserReducer";

export const records = [
    AuthRecord
];

export default combineReducers({
    auth,
    // user
});
