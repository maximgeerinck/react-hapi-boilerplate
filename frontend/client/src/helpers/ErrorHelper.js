import * as types from "../error/ErrorActionTypes";

const timeoutError = (error) => ({ type: types.ERROR_TIMEOUT, body: error });
const knownError = (errors) => ({ type: types.ERROR_KNOWN, body: errors });

export const handle = (error) => {
    // let errors = {};

    if (error.body && error.body.validation) {
        // let keys = Object.keys(error.body.validation);
        // for (let i = 0; i < keys.length; i++) {
        //   switch (error.body.validation[keys[i]].code) {
        //     case 'email.inUse':
        //       errors['email']
        //       errors.push('This email has already been registered');
        //       break;
        //   }
        // }

        return knownError(error.body.validation);
    }

    return timeoutError();
};

export const timeout = (err) => ({ type: types.ERROR_TIMEOUT, body: err });
