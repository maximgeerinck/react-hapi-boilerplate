import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import IcoAgentApp from "./app/IcoAgentApp";
import rootReducer from "./app/reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { syncHistoryWithStore } from "react-router-redux";
import { createBrowserHistory } from "history";
import "./index.scss";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

// random array element
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

let store;
if (process.env.NODE_ENV === "development") {
    const logger = createLogger();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    store = createStore(rootReducer, enhancer);

    if (module.hot) {
        module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer))
    }

} else {
    const enhancer = applyMiddleware(thunk);
    store = createStore(rootReducer, enhancer);
}

const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
    <Provider store={store}>
        <IcoAgentApp history={history} />
    </Provider>,
    document.getElementById("root")
);
