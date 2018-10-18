import * as types from "./GlobalActionTypes";
import { Record, Map } from "immutable";
import { cache, getCache } from "../helpers/CacheHelper";

const ETH_PRICE_KEY = "eth/price";

var InitialState = new Record({
    eth: new Map({
        price: 0,
        isLoaded: false
    })
});

let initialState = new InitialState();
if (getCache(ETH_PRICE_KEY)) {
    initialState = initialState.setIn(["eth", "price"], getCache(ETH_PRICE_KEY)).setIn(["eth", "isLoaded"], true);
}

const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ETH_SUCCESS:
            cache(ETH_PRICE_KEY, action.body);
            return state.setIn(["eth", "price"], action.body).setIn(["eth", "isLoaded"], true);

        default:
            return state;
    }
};

export default GlobalReducer;
