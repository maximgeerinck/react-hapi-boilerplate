import * as types from "../error/ErrorActionTypes";

// const timeoutError = (error) => ({ type: types.ERROR_TIMEOUT, body: error });
// const knownError = (errors) => ({ type: types.ERROR_KNOWN, body: errors });

export const timeout = (err) => ({ type: types.ERROR_TIMEOUT, body: err });
