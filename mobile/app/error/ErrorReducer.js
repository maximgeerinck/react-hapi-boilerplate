import * as types from "./ErrorActionTypes";
import { Record, List } from "immutable";

var InitialState = new Record({
    errors: new List([])
});

let initialState = new InitialState();

const ErrorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ERROR_TIMEOUT:
            return state.set("errors", new List([ action.body ]));
        default:
            return state;
    }
};

export default ErrorReducer;
