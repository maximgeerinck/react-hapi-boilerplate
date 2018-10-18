import * as types from "./GlobalActionTypes";
import { GetRequest } from "../app/api";
// import * as ErrorHelper from "../helpers/ErrorHelper";
// import * as ErrorActions from "../error/ErrorActions";

export const ethSuccess = price => ({ type: types.ETH_SUCCESS, body: price });
export const ethRequest = () => ({ type: types.ETH_REQUEST });

const ETH_API = "https://api.coinmarketcap.com/v1/ticker/ethereum/";

export const loadEthPrice = () => {
    return dispatch => {
        new GetRequest(ETH_API).send().then(obj => {
            dispatch(ethSuccess(Number(obj[0].price_usd)));
        });
    };
};
